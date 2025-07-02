import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import SkillMeter from '@/components/molecules/SkillMeter'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { careerService } from '@/services/api/careerService'
import { learningService } from '@/services/api/learningService'
import { jobService } from '@/services/api/jobService'

const PathDetails = () => {
  const { pathId } = useParams()
  const navigate = useNavigate()
  const [career, setCareer] = useState(null)
  const [resources, setResources] = useState([])
  const [relatedJobs, setRelatedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPathDetails()
  }, [pathId])

  const loadPathDetails = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [careerData, resourcesData, jobsData] = await Promise.all([
        careerService.getById(parseInt(pathId)),
        learningService.getAll(),
        jobService.getAll()
      ])
      
      setCareer(careerData)
      setResources(resourcesData.slice(0, 6)) // Show first 6 resources
      setRelatedJobs(jobsData.filter(job => 
        job.title.toLowerCase().includes(careerData.title.toLowerCase().split(' ')[0])
      ).slice(0, 4))
      
    } catch (err) {
      setError('Failed to load career path details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleStartLearning = () => {
    // Store selected career path
    localStorage.setItem('selectedCareerPath', JSON.stringify(career))
    toast.success('Career path selected! Creating your learning plan...')
    navigate('/learning-plan')
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadPathDetails} />
  if (!career) return <Error message="Career path not found" showRetry={false} />

  // Mock current skills for demonstration
  const currentSkills = career.requiredSkills.map(skill => ({
    name: skill,
    current: Math.floor(Math.random() * 6) + 2, // 2-7
    required: Math.floor(Math.random() * 3) + 8  // 8-10
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/career-paths')}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
          Back to Career Paths
        </motion.button>
        
        <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-4"
              >
                {career.title}
              </motion.h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {career.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                  <ApperIcon name="Target" size={20} className="mr-2" />
                  <span className="font-semibold">{career.matchScore}% Match</span>
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                  <ApperIcon name="DollarSign" size={20} className="mr-2" />
                  <span className="font-semibold">{career.avgSalary}</span>
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                  <ApperIcon name="TrendingUp" size={20} className="mr-2" />
                  <span className="font-semibold">{career.growthRate} Growth</span>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <span className="text-3xl font-bold">{career.matchScore}%</span>
              </div>
              <p className="text-white/80 text-sm">Match Score</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Skills Analysis */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ApperIcon name="BarChart3" size={24} className="mr-3 text-primary-600" />
              Skills Analysis
            </h2>
            
            <div className="space-y-4">
              {currentSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SkillMeter
                    skill={skill.name}
                    currentLevel={skill.current}
                    requiredLevel={skill.required}
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-accent-50 rounded-lg">
              <div className="flex items-center mb-2">
                <ApperIcon name="Lightbulb" size={20} className="text-accent-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Skill Gap Summary</h4>
              </div>
              <p className="text-gray-700">
                You have {currentSkills.filter(s => s.current >= s.required).length} out of {currentSkills.length} required skills. 
                Focus on developing the highlighted areas to increase your readiness for this role.
              </p>
            </div>
          </Card>

          {/* Learning Resources */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ApperIcon name="BookOpen" size={24} className="mr-3 text-secondary-600" />
              Recommended Learning Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border-2 border-gray-100 rounded-lg hover:border-secondary-200 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                    <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                      {resource.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{resource.provider}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <ApperIcon name="Clock" size={14} className="mr-1" />
                      {resource.duration}
                    </div>
                    <div className="font-semibold text-secondary-600">
                      {resource.cost}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Related Jobs */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ApperIcon name="Briefcase" size={24} className="mr-3 text-accent-600" />
              Related Job Opportunities
            </h2>
            
            <div className="space-y-4">
              {relatedJobs.map((job, index) => (
                <motion.div
                  key={job.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border-2 border-gray-100 rounded-lg hover:border-accent-200 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{job.title}</h4>
                      <p className="text-primary-600 font-medium">{job.company}</p>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <ApperIcon name="MapPin" size={14} className="mr-1" />
                        {job.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-secondary-600">{job.salary}</div>
                      <Button variant="ghost" size="sm" className="mt-2">
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Rocket" size={24} className="text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ready to Start?
            </h3>
            <p className="text-gray-600 mb-6">
              Create a personalized learning plan to achieve this career goal.
            </p>
            
            <Button
              onClick={handleStartLearning}
              className="w-full"
              size="lg"
              icon="ArrowRight"
              iconPosition="right"
            >
              Start Learning Plan
            </Button>
          </Card>

          {/* Career Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Insights</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Job Satisfaction</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon 
                      key={i} 
                      name="Star" 
                      size={16} 
                      className={i < 4 ? "text-accent-500" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Work-Life Balance</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon 
                      key={i} 
                      name="Star" 
                      size={16} 
                      className={i < 3 ? "text-accent-500" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Remote Work</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon 
                      key={i} 
                      name="Star" 
                      size={16} 
                      className={i < 4 ? "text-accent-500" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Avg. Time to Land Role</span>
                <span className="font-semibold">3-6 months</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Skills to Develop</span>
                <span className="font-semibold">{currentSkills.filter(s => s.current < s.required).length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Open Positions</span>
                <span className="font-semibold">{relatedJobs.length}+</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PathDetails