import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="animate-pulse">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-3"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-8 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
                <div className="h-4 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-lg p-4 shadow-md"
          >
            <div className="animate-pulse flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-64">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary-500 rounded-full animate-spin mx-auto" style={{ animationDelay: '0.2s', animationDuration: '1.5s' }}></div>
        </div>
        <p className="text-gray-600 font-medium">Loading your career insights...</p>
      </motion.div>
    </div>
  )
}

export default Loading