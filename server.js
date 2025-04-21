const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const restaurants = [
  {
    id: 1,
    name: 'Amala Skye',
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
    menu: ['Jollof Rice with Chicken', 'Fried Rice with Fish', 'Eba with Okra Soup'],
    prices: [2000, 2200, 1800],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    ],
  },
];

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
  res.json({ success: true });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
