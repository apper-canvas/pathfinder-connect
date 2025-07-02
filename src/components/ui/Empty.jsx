import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No results found",
  description = "Try adjusting your criteria or start fresh",
  actionText = "Get Started",
  onAction,
  icon = "Search"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-64 text-center p-8"
    >
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-4">
          <ApperIcon name={icon} size={40} className="text-primary-500" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center shadow-lg">
          <ApperIcon name="Sparkles" size={16} className="text-white" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="px-8 py-4 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform"
        >
          <ApperIcon name="ArrowRight" size={20} className="inline mr-2" />
          {actionText}
        </motion.button>
      )}
      
      <div className="mt-8 flex items-center space-x-4 text-sm text-gray-400">
        <div className="flex items-center space-x-1">
          <ApperIcon name="Target" size={16} />
          <span>Personalized</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <div className="flex items-center space-x-1">
          <ApperIcon name="Zap" size={16} />
          <span>Instant Results</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <div className="flex items-center space-x-1">
          <ApperIcon name="Star" size={16} />
          <span>Expert Guidance</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Empty