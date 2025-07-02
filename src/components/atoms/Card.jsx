import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  gradient = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg transition-all duration-200'
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : ''
  const gradientClasses = gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4 } : {}}
      className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card