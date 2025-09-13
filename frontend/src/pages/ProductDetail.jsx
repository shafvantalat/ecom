import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MessageCircle, Heart, Share2, Star } from 'lucide-react'
import { productService } from '../services/productService'
import { formatPrice, formatWhatsAppMessage, generateWhatsAppURL, getAvailabilityStatus, colorOptions, sizeOptions } from '../utils/helpers'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  const WHATSAPP_PHONE = '+919746078283' // This should come from environment variables

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const response = await productService.getProduct(id)
      setProduct(response.data)
      // Set default selections
      if (response.data.colors && response.data.colors.length > 0) {
        setSelectedColor(response.data.colors[0])
      }
      if (response.data.sizes && response.data.sizes.length > 0) {
        setSelectedSize(response.data.sizes[0])
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const handleWhatsAppOrder = () => {
    if (!product) return

    const message = formatWhatsAppMessage(product, selectedColor, selectedSize)
    const whatsappURL = generateWhatsAppURL(WHATSAPP_PHONE, message)
    window.open(whatsappURL, '_blank')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product not found
          </h2>
          <p className="text-gray-600 mb-4">{error || 'The product you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  const availability = getAvailabilityStatus(product)
  const availableSizes = product.sizes || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button
            onClick={() => navigate('/products')}
            className="hover:text-primary-600 transition-colors"
          >
            Products
          </button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex] || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex 
                        ? 'border-primary-600' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Title & Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </span>
                <span className={`text-sm font-medium ${availability.color}`}>
                  {availability.text}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Color: {selectedColor || 'Select a color'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const colorOption = colorOptions.find(opt => opt.value === color)
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 ${
                          selectedColor === color 
                            ? 'border-primary-600 ring-2 ring-primary-200' 
                            : 'border-gray-300 hover:border-gray-400'
                        } ${colorOption?.color || 'bg-gray-200'}`}
                        title={colorOption?.label || color}
                      />
                    )
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Size: {selectedSize || 'Select a size'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {product.stock} available
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleWhatsAppOrder}
                disabled={!product.availability || product.stock === 0}
                className="btn btn-whatsapp w-full btn-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Order on WhatsApp
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={() => {/* TODO: Add to favorites */}}
                  className="btn btn-secondary flex-1 flex items-center justify-center"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Favorites
                </button>
                <button
                  onClick={handleShare}
                  className="btn btn-secondary flex-1 flex items-center justify-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Product Details
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>SKU:</span>
                  <span>{product._id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stock:</span>
                  <span>{product.stock} units</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail


