import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Debug: Log the API URL being used
console.log('API_BASE_URL:', API_BASE_URL)
console.log('VITE_API_URL env var:', import.meta.env.VITE_API_URL)

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred'
    return Promise.reject(new Error(message))
  }
)

export const productService = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    const queryParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        queryParams.append(key, value)
      }
    })
    
    return api.get(`/products?${queryParams.toString()}`)
  },

  // Get single product
  getProduct: async (id) => {
    return api.get(`/products/${id}`)
  },

  // Get categories
  getCategories: async () => {
    return api.get('/products/categories')
  },

  // Admin functions
  createProduct: async (productData) => {
    return api.post('/products', productData)
  },

  updateProduct: async (id, productData) => {
    return api.put(`/products/${id}`, productData)
  },

  deleteProduct: async (id) => {
    return api.delete(`/products/${id}`)
  },

  // Health check
  healthCheck: async () => {
    return api.get('/health')
  }
}

export default productService


