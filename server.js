const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const Paystack = require('@paystack/paystack-sdk');
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

// Initialize Paystack
const paystack = new Paystack('sk_live_24fb1a967515491c7a737d0fc06ca70d8b7e9fc4');

app.use(cors());
app.use(express.json());

// Merged restaurant list
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
  {
    id: 5,
    name: 'Chicken Republic',
    category: 'Nigerian',
    menu: ['Jollof Rice with Chicken', 'Fried Rice with Fish', 'Chicken and Chips'],
    prices: [2000, 2200, 2500],
    images: [
      'https://images.unsplash.com/photo-1623332253366-82f2e9e88c07',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1626644837735-0b8f0f8a4e2d',
    ],
  },
  {
    id: 6,
    name: 'Ogbona (As He Dey Hot)',
    category: 'Nigerian',
    menu: ['Pounded Yam with Egusi', 'Amala with Ewedu', 'Eba with Vegetable Soup'],
    prices: [1800, 1500, 1700],
    images: [
      'https://images.unsplash.com/photo-1592995709671-87626e2a1a5e',
      'https://images.unsplash.com/photo-1604329768868-9641e9e4b6a7',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
  {
    id: 7,
    name: 'Orupana Deals with Swallow Only',
    category: 'Nigerian',
    menu: ['Semo with Egusi', 'Pounded Yam with Vegetable', 'Eba with Okra'],
    prices: [1600, 1800, 1500],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1592995709671-87626e2a1a5e',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
  {
    id: 8,
    name: 'Buka',
    category: 'Nigerian',
    menu: ['Jollof Rice with Fish', 'Fried Rice with Chicken', 'Eba with Egusi'],
    prices: [2000, 2200, 1800],
    images: [
      'https://images.unsplash.com/photo-1623332253366-82f2e9e88c07',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
  {
    id: 9,
    name: 'Amazing Food',
    category: 'Nigerian',
    menu: ['Rice and Stew', 'Pounded Yam with Egusi', 'Fried Plantain with Fish'],
    prices: [1800, 2000, 1500],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1592995709671-87626e2a1a5e',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
];

// In-memory storage for orders and loyalty points (in production, use a database)
const orders = [];

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

app.post('/pay', async (req, res) => {
  const { email, amount } = req.body;
  try {
    const transaction = await paystack.transaction.initialize({
      email,
      amount: amount * 100, // Paystack expects amount in kobo
      callback_url: 'https://city-food-backend.onrender.com/payment-callback',
    });
    res.json({ paymentUrl: transaction.data.authorization_url });
  } catch (error) {
    console.error('Paystack error:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

app.get('/payment-callback', async (req, res) => {
  const { reference } = req.query;
  try {
    const transaction = await paystack.transaction.verify({ reference });
    if (transaction.data.status === 'success') {
      res.send('Payment successful');
    } else {
      res.status(400).send('Payment failed');
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).send('Verification failed');
  }
});

app.post('/orders', (req, res) => {
  const { userId, restaurantId, items, total } = req.body;
  const order = { userId, restaurantId, items, total, id: orders.length + 1, status: 'Order Placed', estimatedDelivery: '30 mins' };
  orders.push(order);
  console.log('Order received:', order);

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
    description: `Order #${order.id}`,
  });

  res.json({ status: 'Order placed successfully', orderId: order.id });
});

app.get('/orders/:userId', (req, res) => {
  const userId = req.params.userId;
  const userOrders = orders.filter(order => order.userId === userId);
  res.json(userOrders);
});

app.get('/order-tracking/:orderId', (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const order = orders.find(o => o.id === orderId);
  if (order) {
    res.json({ status: order.status, estimatedDelivery: order.estimatedDelivery });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
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
      const orderId = '123'; // Hardcoded for simulation; in production, get from socket data
      const order = orders.find(o => o.id === parseInt(orderId));
      if (order) {
        order.status = orderStatuses[statusIndex];
      }
      socket.emit('orderUpdate', {
        orderId,
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
