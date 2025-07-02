import { motion } from 'framer-motion'

const ProgressBar = ({ 
  progress, 
  className = '', 
  showLabel = true, 
  color = 'primary',
  size = 'md' 
}) => {
  const colors = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    accent: 'from-accent-500 to-accent-600',
  }
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }
  
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-bold text-gray-900">{Math.round(progress)}%</span>
        </div>
      )}
      
      <div className={`bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full relative`}
        >
          <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse rounded-full"></div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressBar