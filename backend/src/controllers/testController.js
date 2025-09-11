// Test controller for development without database
const getTestProducts = async (req, res) => {
  const testProducts = [
    {
      _id: '1',
      name: 'Test Product 1',
      description: 'This is a test product',
      price: 999,
      images: ['https://via.placeholder.com/300'],
      category: 'shoes',
      colors: ['white', 'black'],
      sizes: ['7', '8', '9'],
      availability: true,
      stock: 10,
      featured: true
    },
    {
      _id: '2',
      name: 'Test Product 2',
      description: 'Another test product',
      price: 1999,
      images: ['https://via.placeholder.com/300'],
      category: 'clothes',
      colors: ['blue', 'red'],
      sizes: ['S', 'M', 'L'],
      availability: true,
      stock: 5,
      featured: false
    }
  ];

  res.json({
    success: true,
    data: testProducts,
    pagination: {
      current: 1,
      pages: 1,
      total: 2,
      limit: 12
    }
  });
};

const getTestCategories = async (req, res) => {
  res.json({
    success: true,
    data: ['shoes', 'clothes', 'accessories', 'electronics', 'home', 'beauty']
  });
};

const getTestProduct = async (req, res) => {
  const testProducts = [
    {
      _id: '1',
      name: 'Test Product 1',
      description: 'This is a test product with detailed description. It has amazing features and great quality.',
      price: 999,
      images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
      category: 'shoes',
      colors: ['white', 'black'],
      sizes: ['7', '8', '9'],
      availability: true,
      stock: 10,
      featured: true
    },
    {
      _id: '2',
      name: 'Test Product 2',
      description: 'Another test product with detailed description. Perfect for everyday use.',
      price: 1999,
      images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
      category: 'clothes',
      colors: ['blue', 'red'],
      sizes: ['S', 'M', 'L'],
      availability: true,
      stock: 5,
      featured: false
    }
  ];

  const product = testProducts.find(p => p._id === req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    data: product
  });
};

module.exports = {
  getTestProducts,
  getTestCategories,
  getTestProduct
};


