kkkkconst express = require('express');
const cors = require('cors');
const Paystack = require('@paystack/paystack-sdk');
const app = express();
const port = process.env.PORT || 3000;

// Initialize Paystack with your secret key
const paystack = new Paystack('sk_live_24fb1a967515491c7a737d0fc06ca70d8b7e9fc4');

console.log('PORT environment variable:', process.env.PORT);
console.log('Using port:', port);

app.use(cors());
app.use(express.json());

const restaurants = [
  {
    id: 1,
    name: 'Chicken Republic',
    category: 'Nigerian',
    menu: ['Jollof Rice with Chicken', 'Fried Rice with Fish', 'Chicken and Chips'],
    prices: [2000, 2200, 2500],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
  {
    id: 2,
    name: 'Ogbona (As He Dey Hot)',
    category: 'Nigerian',
    menu: ['Pounded Yam with Egusi', 'Amala with Ewedu', 'Eba with Vegetable Soup'],
    prices: [1800, 1500, 1700],
    images: [
      'https://images.unsplash.com/photo-1592995709671-87626e2a1a5e',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
  {
    id: 3,
    name: 'Orupana Deals with Swallow Only',
    category: 'Nigerian',
    menu: ['Semo with Egusi', 'Pounded Yam with Vegetable', 'Eba with Okra'],
    prices: [1600, 1800, 1500],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
  {
    id: 4,
    name: 'Buka',
    category: 'Nigerian',
    menu: ['Jollof Rice with Fish', 'Fried Rice with Chicken', 'Eba with Egusi'],
    prices: [2000, 2200, 1800],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
  {
    id: 5,
    name: 'Amazing Food',
    category: 'Nigerian',
    menu: ['Rice and Stew', 'Pounded Yam with Egusi', 'Fried Plantain with Fish'],
    prices: [1800, 2000, 1500],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
];

const orders = [];

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
  const order = { ...req.body, id: orders.length + 1, status: 'Order Placed', estimatedDelivery: '30 mins' };
  orders.push(order);
  console.log('Order received:', order);
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
