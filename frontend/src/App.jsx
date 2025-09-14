import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import { ThemeProvider } from './context/ThemeContext'
import DatabaseStatus from './components/DatabaseStatus'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileNav from './components/MobileNav'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken')
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}

function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <DatabaseStatus />
            <Navbar />
            <main className="pb-20 sm:pb-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <MobileNav />
          </div>
        </Router>
      </ProductProvider>
    </ThemeProvider>
  )
}

export default App
