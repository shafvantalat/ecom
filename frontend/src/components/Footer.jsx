import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, MessageCircle, Mail, Phone, Code } from 'lucide-react'
import { AboutModal } from './AboutModal'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Vieara Collections</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for quality products. Order via WhatsApp for a seamless shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=shoes" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Shoes
                </Link>
              </li>
              <li>
                <Link to="/products?category=clothes" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Clothes
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=electronics" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=home" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link to="/products?category=beauty" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Beauty & Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-primary-400" />
                <span className="text-gray-400 text-sm">WhatsApp Orders</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-gray-400 text-sm">muhammedshafvan@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-gray-400 text-sm">+91 97460 78283</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Vieara Collections. All rights reserved.
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAboutOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#1f2230] text-gray-200 hover:bg-[#2b2e3c] transition-colors text-sm"
              >
                <Code className="w-4 h-4" />
                <span>About Developer</span>
              </button>
              <span className="text-gray-400 text-sm">Privacy Policy</span>
              <span className="text-gray-400 text-sm">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </footer>
  )
}

export default Footer


