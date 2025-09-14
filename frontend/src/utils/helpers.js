// Format price with currency symbol
export const formatPrice = (price, currency = '₹') => {
  return `${currency}${Number(price).toLocaleString('en-IN')}`
}

// Format WhatsApp message
export const formatWhatsAppMessage = (product, selectedColor, selectedSize) => {
  const { name, sku, price, availability } = product
  
  return `Hi, I'm interested in product: ${name} (ID: ${sku})
Color: ${selectedColor || 'Not specified'}
Size: ${selectedSize || 'Not specified'}
Price: ${formatPrice(price)}
Availability: ${availability ? 'In Stock' : 'Out of Stock'}`
}

// Generate WhatsApp URL
export const generateWhatsAppURL = (phoneNumber, message) => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Get category display name
export const getCategoryDisplayName = (category) => {
  const categoryMap = {
    shoes: 'Shoes',
    clothes: 'Clothes',
    accessories: 'Accessories',
    electronics: 'Electronics',
    home: 'Home & Living',
    beauty: 'Beauty & Health'
  }
  return categoryMap[category] || category
}

// Get category icon
export const getCategoryIcon = (category) => {
  const iconMap = {
    shoes: '👟',
    clothes: '👕',
    accessories: '👜',
    electronics: '📱',
    home: '🏠',
    beauty: '💄'
  }
  return iconMap[category] || '📦'
}

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.substr(0, maxLength) + '...'
}

// Get availability status
export const getAvailabilityStatus = (product) => {
  if (!product.availability) return { text: 'Out of Stock', color: 'text-red-600' }
  if (product.stock === 0) return { text: 'Out of Stock', color: 'text-red-600' }
  if (product.stock < 10) return { text: 'Low Stock', color: 'text-yellow-600' }
  return { text: 'In Stock', color: 'text-green-600' }
}

// Sort options
export const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }
]

// Color options
export const colorOptions = [
  { value: 'black', label: 'Black', color: 'bg-black' },
  { value: 'white', label: 'White', color: 'bg-white border' },
  { value: 'red', label: 'Red', color: 'bg-red-500' },
  { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
  { value: 'green', label: 'Green', color: 'bg-green-500' },
  { value: 'yellow', label: 'Yellow', color: 'bg-yellow-500' },
  { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
  { value: 'pink', label: 'Pink', color: 'bg-pink-500' },
  { value: 'gray', label: 'Gray', color: 'bg-gray-500' },
  { value: 'brown', label: 'Brown', color: 'bg-amber-700' }
]

// Size options
export const sizeOptions = {
  clothes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL', '9XL', '10XL'],
  shoes: ['6', '7', '8', '9', '10', '11', '12'],
  accessories: ['One Size'],
  electronics: ['One Size'],
  home: ['Small', 'Medium', 'Large'],
  beauty: ['One Size']
}
