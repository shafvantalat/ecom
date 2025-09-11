const Product = require('../models/Product');

const sampleProducts = [
  {
    name: "Classic White Sneakers",
    description: "Comfortable and stylish white sneakers perfect for everyday wear. Made with premium materials and designed for all-day comfort.",
    price: 2999,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    ],
    category: "shoes",
    colors: ["white", "black"],
    sizes: ["7", "8", "9", "10", "11"],
    availability: true,
    stock: 25,
    featured: true
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket with a modern fit. Perfect for layering and adding style to any outfit.",
    price: 2499,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500"
    ],
    category: "clothes",
    colors: ["blue", "black"],
    sizes: ["S", "M", "L", "XL"],
    availability: true,
    stock: 15,
    featured: true
  },
  {
    name: "Leather Crossbody Bag",
    description: "Elegant leather crossbody bag with multiple compartments. Perfect for daily use and special occasions.",
    price: 1899,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    ],
    category: "accessories",
    colors: ["brown", "black"],
    sizes: ["One Size"],
    availability: true,
    stock: 8,
    featured: true
  },
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers.",
    price: 4999,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    ],
    category: "electronics",
    colors: ["black", "white", "blue"],
    sizes: ["One Size"],
    availability: true,
    stock: 12,
    featured: true
  },
  {
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 beautiful ceramic coffee mugs. Perfect for your morning coffee or evening tea.",
    price: 799,
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500",
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500"
    ],
    category: "home",
    colors: ["white", "blue", "green"],
    sizes: ["One Size"],
    availability: true,
    stock: 20,
    featured: false
  },
  {
    name: "Organic Face Cream",
    description: "Natural and organic face cream with vitamin E and aloe vera. Perfect for all skin types.",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500"
    ],
    category: "beauty",
    colors: ["white"],
    sizes: ["One Size"],
    availability: true,
    stock: 18,
    featured: false
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with excellent cushioning and breathable upper. Perfect for jogging and workouts.",
    price: 3999,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    ],
    category: "shoes",
    colors: ["red", "blue", "black"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    availability: true,
    stock: 30,
    featured: true
  },
  {
    name: "Cotton T-Shirt",
    description: "Soft and comfortable cotton t-shirt in various colors. Perfect for casual wear and layering.",
    price: 599,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    ],
    category: "clothes",
    colors: ["white", "black", "gray", "blue", "red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    availability: true,
    stock: 50,
    featured: false
  },
  {
    name: "Smart Watch",
    description: "Feature-rich smartwatch with fitness tracking, heart rate monitor, and smartphone connectivity.",
    price: 8999,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    ],
    category: "electronics",
    colors: ["black", "silver", "gold"],
    sizes: ["One Size"],
    availability: true,
    stock: 6,
    featured: true
  },
  {
    name: "Decorative Plant Pot",
    description: "Beautiful ceramic plant pot perfect for indoor plants. Available in multiple colors and sizes.",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500"
    ],
    category: "home",
    colors: ["white", "terracotta", "blue"],
    sizes: ["Small", "Medium", "Large"],
    availability: true,
    stock: 15,
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${createdProducts.length} products`);

    return createdProducts;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = { seedDatabase, sampleProducts };


