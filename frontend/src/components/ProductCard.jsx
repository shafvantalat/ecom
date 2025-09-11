import { Link } from 'react-router-dom'
import { formatPrice, getAvailabilityStatus, getCategoryIcon } from '../utils/helpers'

const ProductCard = ({ product }) => {
  const availability = getAvailabilityStatus(product)
  const categoryIcon = getCategoryIcon(product.category)

  return (
    <div className="card group hover:shadow-lg transition-all duration-300 bg-white">
      <Link to={`/products/${product._id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.images[0] || '/placeholder-image.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700">
              <span className="mr-1">{categoryIcon}</span>
              {product.category}
            </span>
          </div>

          {/* Availability Badge */}
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              availability.text === 'In Stock' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {availability.text}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            {product.stock > 0 && (
              <span className="text-sm text-gray-500">
                {product.stock} left
              </span>
            )}
          </div>

          {/* Colors Preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1 mb-3">
              <span className="text-sm text-gray-500">Colors:</span>
              <div className="flex space-x-1">
                {product.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-gray-500">
                    +{product.colors.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Sizes Preview */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center space-x-1 mb-3">
              <span className="text-sm text-gray-500">Sizes:</span>
              <div className="flex space-x-1">
                {product.sizes.slice(0, 3).map((size, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {size}
                  </span>
                ))}
                {product.sizes.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{product.sizes.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* View Details Button */}
          <div className="mt-4">
            <span className="btn btn-primary w-full text-center">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard


