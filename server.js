const restaurants = [
  {
    id: 1,
    name: 'Amala Skye',
    category: 'Local Cuisine',
    menu: [
      { name: 'Amala with Ewedu', price: 1200, description: 'Traditional Yoruba dish with stewed greens' },
      { name: 'Pounded Yam with Vegetable', price: 1800, description: 'Served with fresh vegetable stew' },
      { name: 'Semo with Egusi', price: 1500, description: 'Rich melon seed stew with semolina' }
    ],
    images: [
      'https://images.unsplash.com/photo-1592995709671-87626e2a1a5e',
      'https://images.unsplash.com/photo-1604152135912-04a022e23696',
      'https://images.unsplash.com/photo-1623656521035-5d7a77e4d3d7'
    ],
    rating: 4.5,
    deliveryTime: '30-45 mins',
    location: 'Lagos, Nigeria',
    isOpen: true
  },
  {
    id: 2,
    name: 'Iya Basira',
    category: 'Traditional Nigerian',
    menu: [
      { name: 'Jollof Rice with Chicken', price: 2000, description: 'Spicy Nigerian jollof with grilled chicken' },
      { name: 'Fried Rice with Fish', price: 2200, description: 'Flavorful fried rice with fried fish' },
      { name: 'Eba with Okra Soup', price: 1800, description: 'Garri with fresh okra stew' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1610450948077-5d19f641f2e2',
      'https://images.unsplash.com/photo-1623656521035-5d7a77e4d3d7'
    ],
    rating: 4.2,
    deliveryTime: '40-50 mins',
    location: 'Abuja, Nigeria',
    isOpen: true
  },
  {
    id: 3,
    name: 'Tasty Kitchen',
    category: 'Fast Food',
    menu: [
      { name: 'Burger', price: 1500, description: 'Classic beef burger with lettuce and tomato' },
      { name: 'Fries', price: 800, description: 'Crispy golden fries' },
      { name: 'Soda', price: 500, description: 'Refreshing carbonated drink' }
    ],
    images: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
    ],
    rating: 4.0,
    deliveryTime: '20-30 mins',
    location: 'Ibadan, Nigeria',
    isOpen: true
  },
  {
    id: 4,
    name: 'Suya Spot',
    category: 'Grill',
    menu: [
      { name: 'Beef Suya', price: 1000, description: 'Spicy grilled beef skewers' },
      { name: 'Chicken Suya', price: 1200, description: 'Tender chicken skewers with spices' },
      { name: 'Spicy Wings', price: 900, description: 'Hot and spicy chicken wings' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
      'https://images.unsplash.com/photo-1617076929257-cb5edbf81b9b'
    ],
    rating: 4.3,
    deliveryTime: '25-35 mins',
    location: 'Kano, Nigeria',
    isOpen: true
  },
  {
    id: 5,
    name: 'Chicken Republic',
    category: 'Fast Food',
    menu: [
      { name: 'Chicken and Chips', price: 2500, description: 'Fried chicken with crispy chips' },
      { name: 'Spicy Wings', price: 1500, description: 'Hot and spicy wings' },
      { name: 'Rice Meal', price: 2000, description: 'Rice with grilled chicken' }
    ],
    images: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      'https://images.unsplash.com/photo-1617076929257-cb5edbf81b9b',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
    ],
    rating: 4.1,
    deliveryTime: '30-40 mins',
    location: 'Port Harcourt, Nigeria',
    isOpen: true
  },
  {
    id: 6,
    name: 'Ogbona',
    category: 'Local Cuisine',
    menu: [
      { name: 'Ofada Rice with Sauce', price: 1800, description: 'Local rice with spicy stew' },
      { name: 'Pounded Yam with Egusi', price: 2000, description: 'Pounded yam with melon seed stew' },
      { name: 'Amala with Gbegiri', price: 1500, description: 'Amala with bean soup' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1604152135912-04a022e23696',
      'https://images.unsplash.com/photo-1592995709671-87626e2a1a5e'
    ],
    rating: 4.4,
    deliveryTime: '35-45 mins',
    location: 'Benin City, Nigeria',
    isOpen: true
  },
  {
    id: 7,
    name: 'Orupana Deals',
    category: 'Traditional Nigerian',
    menu: [
      { name: 'Jollof Rice with Beef', price: 2200, description: 'Jollof rice with tender beef' },
      { name: 'Fried Plantain with Fish', price: 1800, description: 'Crispy plantain with fried fish' },
      { name: 'Eba with Vegetable Soup', price: 2000, description: 'Garri with vegetable stew' }
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1610450948077-5d19f641f2e2',
      'https://images.unsplash.com/photo-1623656521035-5d7a77e4d3d7'
    ],
    rating: 4.3,
    deliveryTime: '40-50 mins',
    location: 'Enugu, Nigeria',
    isOpen: true
  },
  {
    id: 8,
    name: 'Buka',
    category: 'Local Cuisine',
    menu: [
      { name: 'Amala with Efo Riro', price: 1500, description: 'Amala with spinach stew' },
      { name: 'Semo with Edikang Ikong', price: 1800, description: 'Semo with vegetable and fish stew' },
      { name: 'Pounded Yam with Afang Soup', price: 2000, description: 'Pounded yam with afang leaf stew' }
    ],
    images: [
      'https://images.unsplash.com/photo-1592995709671-87626e2a1a5e',
      'https://images.unsplash.com/photo-1604152135912-04a022e23696',
      'https://images.unsplash.com/photo-1623656521035-5d7a77e4d3d7'
    ],
    rating: 4.6,
    deliveryTime: '30-40 mins',
    location: 'Calabar, Nigeria',
    isOpen: true
  },
  {
    id: 9,
    name: 'Amazing Food',
    category: 'Fast Food',
    menu: [
      { name: 'Pizza', price: 3000, description: 'Cheesy pizza with assorted toppings' },
      { name: 'Shawarma', price: 1500, description: 'Spicy shawarma with veggies' },
      { name: 'Smoothie', price: 1000, description: 'Fresh fruit smoothie' }
    ],
    images: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a680',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1505253710320-7924e9398e2a'
    ],
    rating: 4.0,
    deliveryTime: '25-35 mins',
    location: 'Abuja, Nigeria',
    isOpen: true
  }
];
