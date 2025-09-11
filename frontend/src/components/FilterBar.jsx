import { useState, useEffect } from 'react'
import { Filter, X, ChevronDown } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import { getCategoryDisplayName, colorOptions, sizeOptions, sortOptions } from '../utils/helpers'

const FilterBar = () => {
  const { filters, setFilters, clearFilters, categories } = useProducts()
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const applyFilters = () => {
    setFilters(localFilters)
    setIsOpen(false)
  }

  const resetFilters = () => {
    setLocalFilters({
      category: '',
      color: '',
      size: '',
      minPrice: '',
      maxPrice: '',
      availability: '',
      search: '',
      sort: 'newest'
    })
    clearFilters()
    setIsOpen(false)
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== 'newest'
  )

  return (
    <div className="bg-white border-b sticky top-16 z-40">
      <div className="container mx-auto px-4">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden py-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 rounded-lg border"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters</span>
              {hasActiveFilters && (
                <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                  {Object.values(filters).filter(v => v !== '' && v !== 'newest').length}
                </span>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:block py-4">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Search products..."
                value={localFilters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input w-full"
              />
            </div>

            {/* Category */}
            <div>
              <select
                value={localFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input w-full"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryDisplayName(category)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={localFilters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="input w-full"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <select
                value={localFilters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                className="input w-full"
              >
                <option value="">All Items</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={applyFilters}
                className="btn btn-primary flex-1"
              >
                Apply
              </button>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="btn btn-secondary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Panel */}
        {isOpen && (
          <div className="md:hidden border-t bg-gray-50 p-4 space-y-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search products..."
                value={localFilters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input w-full"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={localFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input w-full"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryDisplayName(category)}
                  </option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color.value}
                    onClick={() => handleFilterChange('color', 
                      localFilters.color === color.value ? '' : color.value
                    )}
                    className={`w-8 h-8 rounded-full border-2 ${
                      localFilters.color === color.value 
                        ? 'border-primary-600 ring-2 ring-primary-200' 
                        : 'border-gray-300'
                    } ${color.color}`}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {localFilters.category && sizeOptions[localFilters.category] ? (
                  sizeOptions[localFilters.category].map(size => (
                    <button
                      key={size}
                      onClick={() => handleFilterChange('size', 
                        localFilters.size === size ? '' : size
                      )}
                      className={`px-3 py-1 text-sm rounded border ${
                        localFilters.size === size
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-300 bg-white text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Select a category first</p>
                )}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={localFilters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={localFilters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="input"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={localFilters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="input w-full"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <select
                value={localFilters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                className="input w-full"
              >
                <option value="">All Items</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              <button
                onClick={applyFilters}
                className="btn btn-primary flex-1"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="btn btn-secondary"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterBar


