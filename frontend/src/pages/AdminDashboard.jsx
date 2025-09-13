import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Grid, 
  List,
  LogOut,
  Package,
  TrendingUp,
  Users,
  Eye
} from 'lucide-react'
import { productService } from '../services/productService'
import { formatPrice, getAvailabilityStatus } from '../utils/helpers'

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    availability: true,
    featured: false,
    colors: [],
    sizes: [],
    images: []
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin/login')
      return
    }
    
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getProducts({ limit: 50 })
      setProducts(response.data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      await productService.deleteProduct(productId)
      setProducts(products.filter(p => p._id !== productId))
    } catch (error) {
      setError(error.message)
    }
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      if (editingProduct) {
        // Update existing product
        await productService.updateProduct(editingProduct._id, formData)
        setProducts(products.map(p => p._id === editingProduct._id ? { ...p, ...formData } : p))
      } else {
        // Create new product
        const newProduct = await productService.createProduct(formData)
        setProducts([...products, newProduct.data])
      }
      
      // Reset form
      setFormData({
        sku: '',
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        availability: true,
        featured: false,
        colors: [],
        sizes: [],
        images: []
      })
      setShowAddForm(false)
      setEditingProduct(null)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      sku: product.sku || '',
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      availability: product.availability,
      featured: product.featured,
      colors: product.colors || [],
      sizes: product.sizes || [],
      images: product.images || []
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    totalProducts: products.length,
    inStock: products.filter(p => p.availability && p.stock > 0).length,
    outOfStock: products.filter(p => !p.availability || p.stock === 0).length,
    featured: products.filter(p => p.featured).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your products</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-secondary flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inStock}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Package className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 w-full"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Products List */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => {
              const availability = getAvailabilityStatus(product)
              return (
                <div key={product._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={product.images[0] || '/placeholder-image.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-primary-600 mb-2">
                      {formatPrice(product.price)}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-sm font-medium ${availability.color}`}>
                        {availability.text}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.stock} left
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn btn-secondary btn-sm flex-1 flex items-center justify-center"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-secondary btn-sm flex items-center justify-center text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No products found' : 'No products yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Get started by adding your first product'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary"
              >
                Add Product
              </button>
            )}
          </div>
        )}

        {/* Add/Edit Product Modal */}
        {(showAddForm || editingProduct) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product ID (SKU)
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleFormChange}
                        className="input w-full"
                        placeholder="Enter unique ID"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="input w-full"
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleFormChange}
                        className="input w-full"
                        placeholder="Enter price"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      className="input w-full h-24 resize-none"
                      placeholder="Enter product description"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                        className="input w-full"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="shoes">Shoes</option>
                        <option value="clothes">Clothes</option>
                        <option value="accessories">Accessories</option>
                        <option value="electronics">Electronics</option>
                        <option value="home">Home & Living</option>
                        <option value="beauty">Beauty & Health</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleFormChange}
                        className="input w-full"
                        placeholder="Enter stock quantity"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Colors
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
                      {[
                        'Black', 'White', 'Navy', 'Gray', 'Charcoal',
                        'Red', 'Crimson', 'Burgundy', 'Maroon', 'Deep Plum',
                        'Blue', 'Royal Blue', 'Sky Blue', 'Teal', 'Turquoise',
                        'Green', 'Forest Green', 'Emerald', 'Mint', 'Sage',
                        'Purple', 'Lavender', 'Violet', 'Magenta', 'Fuchsia',
                        'Pink', 'Rose', 'Coral', 'Salmon', 'Blush',
                        'Yellow', 'Gold', 'Mustard', 'Cream', 'Ivory',
                        'Orange', 'Peach', 'Apricot', 'Tangerine', 'Rust',
                        'Brown', 'Tan', 'Beige', 'Camel', 'Khaki',
                        'Silver', 'Metallic', 'Shimmer', 'Glitter', 'Holographic'
                      ].map(color => (
                        <label key={color} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={formData.colors.includes(color)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({ ...prev, colors: [...prev.colors, color] }))
                              } else {
                                setFormData(prev => ({ ...prev, colors: prev.colors.filter(c => c !== color) }))
                              }
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
                          />
                          <span className="text-gray-700">{color}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Or add custom colors (comma-separated)"
                        className="input w-full text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            const customColors = e.target.value.split(',').map(c => c.trim()).filter(c => c)
                            setFormData(prev => ({ ...prev, colors: [...prev.colors, ...customColors] }))
                            e.target.value = ''
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sizes
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3">
                      {[
                        'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL', '9XL', '10XL',
                        '0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30',
                        '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56', '58', '60'
                      ].map(size => (
                        <label key={size} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={formData.sizes.includes(size)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({ ...prev, sizes: [...prev.sizes, size] }))
                              } else {
                                setFormData(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== size) }))
                              }
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
                          />
                          <span className="text-gray-700">{size}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Or add custom sizes (comma-separated)"
                        className="input w-full text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            const customSizes = e.target.value.split(',').map(s => s.trim()).filter(s => s)
                            setFormData(prev => ({ ...prev, sizes: [...prev.sizes, ...customSizes] }))
                            e.target.value = ''
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Images (comma-separated URLs)
                    </label>
                    <input
                      type="text"
                      name="images"
                      value={formData.images.join(', ')}
                      onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value.split(',').map(i => i.trim()).filter(i => i) }))}
                      className="input w-full"
                      placeholder="e.g., https://example.com/image1.jpg, https://example.com/image2.jpg"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="availability"
                        checked={formData.availability}
                        onChange={handleFormChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Available</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleFormChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false)
                        setEditingProduct(null)
                      }}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard


