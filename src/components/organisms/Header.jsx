import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const navItems = [
    { path: '/assessment', label: 'Assessment', icon: 'Target' },
    { path: '/career-paths', label: 'Career Paths', icon: 'Compass' },
    { path: '/learning-plan', label: 'Learning Plan', icon: 'BookOpen' },
    { path: '/jobs', label: 'Jobs', icon: 'Briefcase' },
    { path: '/progress', label: 'Progress', icon: 'BarChart3' },
  ]
  
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Navigation" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  PathFinder Pro
                </h1>
                <p className="text-xs text-gray-600">Find Your Perfect Career</p>
              </div>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`
                }
              >
                <ApperIcon name={item.icon} size={16} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              <ApperIcon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3 ${
                      isActive
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }`
                  }
                >
                  <ApperIcon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header