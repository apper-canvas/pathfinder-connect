import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const JobCard = ({ job, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 group cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-primary-600 font-semibold">{job.company}</p>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-secondary-600">{job.salary}</div>
            <div className="text-sm text-gray-600 flex items-center">
              <ApperIcon name="MapPin" size={14} className="mr-1" />
              {job.location}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Requirements:</p>
          <div className="flex flex-wrap gap-2">
            {job.requirements.slice(0, 4).map((req, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {req}
              </span>
            ))}
            {job.requirements.length > 4 && (
              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                +{job.requirements.length - 4} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center text-gray-500 text-sm">
            <ApperIcon name="Clock" size={14} className="mr-1" />
            <span>Posted 2 days ago</span>
          </div>
          
          <div className="flex items-center text-primary-600 group-hover:text-primary-700 transition-colors">
            <span className="text-sm font-medium">Apply now</span>
            <ApperIcon name="ExternalLink" size={16} className="ml-2" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default JobCard