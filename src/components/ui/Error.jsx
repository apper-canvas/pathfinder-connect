import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Something went wrong", onRetry, showRetry = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-64 text-center p-8"
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" size={32} className="text-red-500" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <ApperIcon name="X" size={12} className="text-white" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
        {message}
      </p>
      
      {showRetry && (
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="RefreshCw" size={18} className="inline mr-2" />
            Try Again
          </button>
          
          <p className="text-sm text-gray-500">
            If this problem persists, please refresh the page
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default Error