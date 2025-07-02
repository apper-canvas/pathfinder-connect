import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SkillMeter = ({ skill, currentLevel, requiredLevel, className = '' }) => {
  const percentage = (currentLevel / 10) * 100
  const requiredPercentage = (requiredLevel / 10) * 100
  const gap = requiredLevel - currentLevel
  
  return (
    <div className={`bg-white rounded-lg p-4 border-2 border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{skill}</h4>
          <p className="text-sm text-gray-600">
            Current: {currentLevel}/10 | Required: {requiredLevel}/10
          </p>
        </div>
        
        {gap > 0 ? (
          <div className="flex items-center text-accent-600 bg-accent-50 px-2 py-1 rounded-full">
            <ApperIcon name="TrendingUp" size={14} className="mr-1" />
            <span className="text-xs font-medium">+{gap} needed</span>
          </div>
        ) : (
          <div className="flex items-center text-secondary-600 bg-secondary-50 px-2 py-1 rounded-full">
            <ApperIcon name="CheckCircle" size={14} className="mr-1" />
            <span className="text-xs font-medium">Ready</span>
          </div>
        )}
      </div>
      
      <div className="relative">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
          />
        </div>
        
        {/* Required level marker */}
        <div 
          className="absolute top-0 h-3 w-0.5 bg-accent-500"
          style={{ left: `${requiredPercentage}%` }}
        >
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent-500 rounded-full"></div>
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Beginner</span>
        <span>Expert</span>
      </div>
    </div>
  )
}

export default SkillMeter