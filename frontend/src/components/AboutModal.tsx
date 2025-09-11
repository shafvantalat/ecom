import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, Linkedin, Mail, Code, Palette, Zap, ExternalLink } from 'lucide-react'

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1c1e25]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#2c2f3a] rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 id="about-modal-title" className="text-2xl font-bold text-white">
                About Developer
              </h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#3a3f4e] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-300" />
              </motion.button>
            </div>

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#444857] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">MS</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Muhammed Shafvan</h3>
              <p className="text-gray-300 text-sm">Full Stack Developer & UI/UX Enthusiast</p>
            </div>

            <div className="mb-6">
              <motion.a
                href="https://shafvan.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#1f2230] text-white rounded-xl hover:bg-[#2b2e3c] transition-all duration-200 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Portfolio</span>
              </motion.a>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Code className="w-4 h-4 text-red-500" />
                <span>Passionate about creating beautiful, functional web applications</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Palette className="w-4 h-4 text-white" />
                <span>Expert in React, TypeScript, and modern web technologies</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Zap className="w-4 h-4 text-white" />
                <span>Focused on performance, accessibility, and user experience</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <p className="text-xs text-gray-400 text-center mb-4">Connect with me</p>
              <div className="flex justify-center space-x-3">
                <motion.a
                  href="https://github.com/shafvantalat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#1f2230] text-white hover:bg-[#2b2e3c] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/muhammed-shafvan-121585215/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#1f2230] text-white hover:bg-[#2b2e3c] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="mailto:muhammedshafvan.mn@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#1f2230] text-white hover:bg-[#2b2e3c] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Vieara Collections v1.0 – Built with <span className="text-red-500">❤️</span> in 2025
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AboutModal
