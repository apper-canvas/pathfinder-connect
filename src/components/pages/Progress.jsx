import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ProgressBar from '@/components/molecules/ProgressBar'
import Loading from '@/components/ui/Loading'
import Empty from '@/components/ui/Empty'

const Progress = () => {
  const [loading, setLoading] = useState(true)
  const [assessmentData, setAssessmentData] = useState(null)
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [learningProgress, setLearningProgress] = useState([])
  const [skillProgress, setSkillProgress] = useState([])

  useEffect(() => {
    loadProgressData()
  }, [])

  const loadProgressData = async () => {
    try {
      setLoading(true)
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Load data from localStorage
      const assessment = localStorage.getItem('assessmentData')
      const career = localStorage.getItem('selectedCareerPath')
      const learningData = localStorage.getItem('learningProgress')
      
      if (assessment) setAssessmentData(JSON.parse(assessment))
      if (career) setSelectedCareer(JSON.parse(career))
      if (learningData) setLearningProgress(JSON.parse(learningData))
      
      // Mock skill progress data
      setSkillProgress([
        { name: 'Programming', current: 6, target: 8, progress: 75 },
        { name: 'Communication', current: 7, target: 9, progress: 78 },
        { name: 'Leadership', current: 4, target: 7, progress: 57 },
        { name: 'Problem Solving', current: 8, target: 9, progress: 89 },
        { name: 'Data Analysis', current: 5, target: 8, progress: 63 },
      ])
      
    } catch (err) {
      console.error('Failed to load progress data:', err)
    } finally {
      setLoading(false)
    }
  }

  const calculateOverallProgress = () => {
    if (skillProgress.length === 0) return 0
    const total = skillProgress.reduce((sum, skill) => sum + skill.progress, 0)
    return Math.round(total / skillProgress.length)
  }

  const getCompletedResources = () => {
    return learningProgress.length
  }

  const getDaysStudying = () => {
    // Mock calculation - in real app, this would track actual study days
    return Math.floor(Math.random() * 45) + 15 // 15-60 days
  }

  const getStreak = () => {
    // Mock streak calculation
    return Math.floor(Math.random() * 14) + 1 // 1-14 days
  }

  if (loading) return <Loading />

  if (!assessmentData && !selectedCareer) {
    return (
      <Empty
        title="No Progress Data Available"
        description="Complete the assessment and start learning to track your progress"
        actionText="Take Assessment"
        onAction={() => window.location.href = '/assessment'}
        icon="BarChart3"
      />
    )
  }

  const overallProgress = calculateOverallProgress()
  const completedResources = getCompletedResources()
  const daysStudying = getDaysStudying()
  const currentStreak = getStreak()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4"
        >
          Your Progress Dashboard
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track your journey towards {selectedCareer ? selectedCareer.title : 'your career goals'}
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Target" size={24} className="text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{overallProgress}%</div>
            <p className="text-gray-600">Overall Progress</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="BookOpen" size={24} className="text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{completedResources}</div>
            <p className="text-gray-600">Resources Completed</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Calendar" size={24} className="text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{daysStudying}</div>
            <p className="text-gray-600">Days Learning</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Flame" size={24} className="text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{currentStreak}</div>
            <p className="text-gray-600">Day Streak</p>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Development */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ApperIcon name="TrendingUp" size={24} className="mr-3 text-primary-600" />
              Skill Development
            </h2>
            
            <div className="space-y-6">
              {skillProgress.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <div className="text-sm text-gray-600">
                      {skill.current}/{skill.target}
                    </div>
                  </div>
                  <ProgressBar
                    progress={skill.progress}
                    showLabel={false}
                    color={skill.progress >= 80 ? 'secondary' : skill.progress >= 60 ? 'accent' : 'primary'}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center mb-2">
                <ApperIcon name="Lightbulb" size={20} className="text-primary-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Next Steps</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Focus on Leadership and Data Analysis to reach your target skill levels faster.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Learning Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ApperIcon name="Activity" size={24} className="mr-3 text-secondary-600" />
              Learning Activity
            </h2>
            
            <div className="space-y-4">
              {/* Recent Activities */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Completed JavaScript Fundamentals</p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                  <ApperIcon name="CheckCircle" size={16} className="text-secondary-600" />
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-accent-50 rounded-lg">
                  <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Started React Course</p>
                    <p className="text-xs text-gray-600">Yesterday</p>
                  </div>
                  <ApperIcon name="Play" size={16} className="text-accent-600" />
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Achieved 7-day streak</p>
                    <p className="text-xs text-gray-600">3 days ago</p>
                  </div>
                  <ApperIcon name="Award" size={16} className="text-primary-600" />
                </div>
              </div>
              
              {/* Weekly Goal */}
              <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Weekly Goal</h4>
                  <span className="text-sm text-gray-600">5/7 days</span>
                </div>
                <ProgressBar progress={71} showLabel={false} color="secondary" />
                <p className="text-sm text-gray-600 mt-2">2 more days to reach your weekly goal!</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ApperIcon name="Award" size={24} className="mr-3 text-accent-600" />
            Achievements & Milestones
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="BookOpen" size={24} className="text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">First Course</h4>
              <p className="text-sm text-gray-600">Completed your first learning resource</p>
              <div className="text-xs text-secondary-600 font-medium mt-2">Earned 2 days ago</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Flame" size={24} className="text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">On Fire</h4>
              <p className="text-sm text-gray-600">Maintained a 7-day learning streak</p>
              <div className="text-xs text-accent-600 font-medium mt-2">Earned 3 days ago</div>
            </div>
            
            <div className="text-center p-4 bg-gray-100 rounded-lg opacity-60">
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <ApperIcon name="Target" size={24} className="text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Skill Master</h4>
              <p className="text-sm text-gray-600">Reach 90% in any skill area</p>
              <div className="text-xs text-gray-500 font-medium mt-2">Not yet earned</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ApperIcon name="CheckSquare" size={24} className="mr-3 text-primary-600" />
            Recommended Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border-2 border-primary-200 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <ApperIcon name="BookOpen" size={20} className="text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Continue Learning</h4>
                  <p className="text-sm text-gray-600">Resume your React course</p>
                </div>
              </div>
              <Button variant="primary" size="sm" className="w-full">
                Continue Course
              </Button>
            </div>
            
            <div className="p-4 border-2 border-secondary-200 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                  <ApperIcon name="Users" size={20} className="text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Join Community</h4>
                  <p className="text-sm text-gray-600">Connect with other learners</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="w-full">
                Find Groups
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Progress