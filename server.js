const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const port = process.env.PORT || 3000;
console.log('PORT environment variable:', process.env.PORT);
console.log('Using port:', port);

app.use(express.json());

// Expanded restaurant list
const restaurants = [
  {
    id: 1,
    name: 'Amala Skye',
    category: 'Local Cuisine',
    menu: ['Amala with Ewedu', 'Pounded Yam with Vegetable', 'Semo with Egusi'],
    prices: [1200, 1800, 1500],
    images: [
      'https://images.unsplash.com/photo-1592995709671-87626e2a1a5e',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
  {
    id: 2,
    name: 'Iya Basira',
    category: 'Traditional Nigerian',
    menu: ['Jollof Rice with Chicken', 'Fried Rice with Fish', 'Eba with Okra Soup'],
    prices: [2000, 2200, 1800],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
  {
    id: 3,
    name: 'Tasty Kitchen',
    category: 'Fast Food',
    menu: ['Burger', 'Fries', 'Soda'],
    prices: [1500, 800, 500],
    images: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
  {
    id: 4,
    name: 'Suya Spot',
    category: 'Grill',
    menu: ['Beef Suya', 'Chicken Suya', 'Spicy Wings'],
    prices: [1000, 1200, 900],
    images: [
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
    ],
  },
];

// In-memory storage for loyalty points (in production, use a database)
const loyaltyData = {
  'user1': {
    points: 100,
    history: [
      { id: '1', date: '2025-04-20', points: 50, description: 'Order #123' },
      { id: '2', date: '2025-04-19', points: -50, description: 'Redeemed ₦500 discount' },
    ],
  },
};

app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

app.post('/pay', (req, res) => {
  const { email, amount } = req.body;
  res.json({ paymentUrl: `https://paystack.com/pay/fake-payment?email=${email}&amount=${amount}` });
});

app.post('/orders', (req, res) => {
  const { userId, restaurantId, items, total } = req.body;
  console.log('Order received:', { userId, restaurantId, items, total });

  // Award loyalty points (e.g., 1 point per ₦100 spent)
  const pointsEarned = Math.floor(total / 100);
  if (!loyaltyData[userId]) {
    loyaltyData[userId] = { points: 0, history: [] };
  }
  loyaltyData[userId].points += pointsEarned;
  loyaltyData[userId].history.push({
    id: (loyaltyData[userId].history.length + 1).toString(),
    date: new Date().toISOString().split('T')[0],
    points: pointsEarned,
    description: `Order #${Math.floor(Math.random() * 1000)}`,
  });

  res.json({ success: true });
});

app.get('/loyalty/:userId', (req, res) => {
  const { userId } = req.params;
  if (!loyaltyData[userId]) {
    loyaltyData[userId] = { points: 0, history: [] };
  }
  res.json(loyaltyData[userId]);
});

app.post('/loyalty/:userId/redeem', (req, res) => {
  const { userId } = req.params;
  const { points, discount } = req.body;
  if (!loyaltyData[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (loyaltyData[userId].points < points) {
    return res.status(400).json({ error: 'Insufficient points' });
  }
  loyaltyData[userId].points -= points;
  loyaltyData[userId].history.push({
    id: (loyaltyData[userId].history.length + 1).toString(),
    date: new Date().toISOString().split('T')[0],
    points: -points,
    description: `Redeemed ₦${discount} discount`,
  });
  res.json({ success: true, points: loyaltyData[userId].points });
});

app.get('/recommendations/:userId', (req, res) => {
  // Placeholder for AI-powered recommendations
  // In production, integrate with an ML model (e.g., collaborative filtering)
  const recommendations = restaurants.slice(0, 3); // Return first 3 restaurants for now
  res.json(recommendations);
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Simulate order updates
  const orderStatuses = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'];
  let statusIndex = 0;

  const interval = setInterval(() => {
    if (statusIndex < orderStatuses.length) {
      socket.emit('orderUpdate', {
        orderId: '123',
        status: orderStatuses[statusIndex],
        timestamp: new Date().toISOString(),
      });
      statusIndex++;
    } else {
      clearInterval(interval);
    }
  }, 5000); // Update every 5 seconds

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    clearInterval(interval);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
