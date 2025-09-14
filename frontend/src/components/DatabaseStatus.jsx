import { useState, useEffect } from 'react'
import { Database, Wifi, WifiOff, AlertCircle } from 'lucide-react'
import { productService } from '../services/productService'

const DatabaseStatus = () => {
  const [status, setStatus] = useState({
    connected: false,
    type: 'unknown',
    loading: true
  })

  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  const checkDatabaseStatus = async () => {
    try {
      // Try to fetch products to check if we're connected to real database
      const response = await productService.getProducts({ limit: 1 })
      
      // If we get a response with data, we're connected to MongoDB
      if (response && response.data && response.data.length > 0) {
        setStatus({
          connected: true,
          type: 'mongodb',
          loading: false
        })
      } else {
        setStatus({
          connected: true,
          type: 'test',
          loading: false
        })
      }
    } catch (error) {
      // If API call fails, we're probably using test data
      setStatus({
        connected: false,
        type: 'test',
        loading: false
      })
    }
  }

  const getStatusConfig = () => {
    if (status.loading) {
      return {
        icon: <AlertCircle className="w-4 h-4" />,
        text: 'Checking connection...',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
        textColor: 'text-yellow-800 dark:text-yellow-400',
        borderColor: 'border-yellow-200 dark:border-yellow-800'
      }
    }

    if (status.connected && status.type === 'mongodb') {
      return {
        icon: <Database className="w-4 h-4" />,
        text: 'Connected to Server',
        bgColor: 'bg-green-100 dark:bg-green-900/20',
        textColor: 'text-green-800 dark:text-green-400',
        borderColor: 'border-green-200 dark:border-green-800'
      }
    }

    if (status.connected && status.type === 'test') {
      return {
        icon: <Wifi className="w-4 h-4" />,
        text: 'Using Test Data (No Database)',
        bgColor: 'bg-blue-100 dark:bg-blue-900/20',
        textColor: 'text-blue-800 dark:text-blue-400',
        borderColor: 'border-blue-200 dark:border-blue-800'
      }
    }

    return {
      icon: <WifiOff className="w-4 h-4" />,
      text: 'Database Connection Error',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      textColor: 'text-red-800 dark:text-red-400',
      borderColor: 'border-red-200 dark:border-red-800'
    }
  }

  const config = getStatusConfig()

  return (
    <div className={`${config.bgColor} ${config.borderColor} border-b px-4 py-2`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-center space-x-2">
          {config.icon}
          <span className={`text-sm font-medium ${config.textColor}`}>
            {config.text}
          </span>
          {status.type === 'test' && (
            <span className="text-xs text-gray-600 dark:text-gray-400">
              (Admin features limited)
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default DatabaseStatus
 