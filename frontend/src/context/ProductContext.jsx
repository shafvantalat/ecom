import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { productService } from '../services/productService'

const ProductContext = createContext()

const initialState = {
  products: [],
  featuredProducts: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    color: '',
    size: '',
    minPrice: '',
    maxPrice: '',
    availability: '',
    search: '',
    sort: 'newest'
  },
  pagination: {
    current: 1,
    pages: 1,
    total: 0,
    limit: 12
  }
}

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload.data,
        pagination: action.payload.pagination,
        loading: false,
        error: null
      }
    
    case 'SET_FEATURED_PRODUCTS':
      return { ...state, featuredProducts: action.payload }
    
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    
    case 'CLEAR_FILTERS':
      return { ...state, filters: initialState.filters }
    
    case 'SET_PAGE':
      return { ...state, pagination: { ...state.pagination, current: action.payload } }
    
    default:
      return state
  }
}

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState)

  // Load categories on mount
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await productService.getCategories()
      dispatch({ type: 'SET_CATEGORIES', payload: response.data })
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const loadProducts = async (filters = state.filters, page = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await productService.getProducts({ ...filters, page })
      dispatch({ type: 'SET_PRODUCTS', payload: response })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const loadFeaturedProducts = async () => {
    try {
      const response = await productService.getProducts({ featured: true, limit: 6 })
      dispatch({ type: 'SET_FEATURED_PRODUCTS', payload: response.data })
    } catch (error) {
      console.error('Error loading featured products:', error)
    }
  }

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters })
  }

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' })
  }

  const setPage = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page })
  }

  const value = {
    ...state,
    loadProducts,
    loadFeaturedProducts,
    setFilters,
    clearFilters,
    setPage
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}


