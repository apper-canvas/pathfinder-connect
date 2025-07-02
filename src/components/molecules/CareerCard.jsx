import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const CareerCard = ({ career, index = 0 }) => {
  const navigate = useNavigate()
  
  const getMatchColor = (score) => {
    if (score >= 90) return 'text-secondary-600 bg-secondary-100'
    if (score >= 75) return 'text-accent-600 bg-accent-100'
    return 'text-primary-600 bg-primary-100'
  }
  
  const handleClick = () => {
    navigate(`/career-paths/${career.Id}`)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card 
        className="p-6 cursor-pointer group"
        onClick={handleClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {career.title}
            </h3>
            <p className="text-gray-600 mt-1">{career.description}</p>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchColor(career.matchScore)}`}>
            {career.matchScore}% match
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-700">
            <ApperIcon name="DollarSign" size={16} className="mr-2 text-secondary-600" />
            <span className="font-semibold">{career.avgSalary}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <ApperIcon name="TrendingUp" size={16} className="mr-2 text-accent-600" />
            <span>{career.growthRate} growth rate</span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">Key Skills Required:</p>
          <div className="flex flex-wrap gap-2">
            {career.requiredSkills.slice(0, 3).map((skill, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {career.requiredSkills.length > 3 && (
              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                +{career.requiredSkills.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-primary-600 group-hover:text-primary-700 transition-colors">
          <span className="text-sm font-medium">Learn more</span>
          <ApperIcon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </motion.div>
  )
}

export default CareerCard