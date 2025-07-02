import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ProgressBar from '@/components/molecules/ProgressBar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { learningService } from '@/services/api/learningService'

const LearningPlan = () => {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [completedItems, setCompletedItems] = useState([])
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    loadLearningPlan()
    loadSelectedCareer()
    loadProgress()
  }, [])

  const loadLearningPlan = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await learningService.getAll()
      setResources(data)
    } catch (err) {
      setError('Failed to load learning plan. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadSelectedCareer = () => {
    const stored = localStorage.getItem('selectedCareerPath')
    if (stored) {
      setSelectedCareer(JSON.parse(stored))
    }
  }

  const loadProgress = () => {
    const stored = localStorage.getItem('learningProgress')
    if (stored) {
      setCompletedItems(JSON.parse(stored))
    }
  }

  const saveProgress = (newCompleted) => {
    localStorage.setItem('learningProgress', JSON.stringify(newCompleted))
    setCompletedItems(newCompleted)
  }

  const toggleComplete = (resourceId) => {
    const newCompleted = completedItems.includes(resourceId)
      ? completedItems.filter(id => id !== resourceId)
      : [...completedItems, resourceId]
    
    saveProgress(newCompleted)
}

  const openResource = (resource) => {
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer')
      toast.success(`Opening ${resource.title} in new tab`)
    } else {
      toast.error('Resource link not available')
    }
  }

  const phases = [
    {
      id: 'foundation',
      title: 'Foundation Phase',
      description: 'Build core knowledge and fundamental skills',
      duration: '2-4 weeks',
      color: 'primary'
    },
    {
      id: 'intermediate',
      title: 'Skill Development',
      description: 'Develop specialized skills and practical experience',
      duration: '6-8 weeks',
      color: 'secondary'
    },
    {
      id: 'advanced',
      title: 'Advanced Mastery',
      description: 'Master advanced concepts and real-world applications',
      duration: '4-6 weeks',
      color: 'accent'
    }
  ]

  const getPhaseResources = (phase) => {
    const startIdx = phase === 'foundation' ? 0 : phase === 'intermediate' ? 4 : 8
    return resources.slice(startIdx, startIdx + 4)
  }

  const calculateProgress = () => {
    return resources.length > 0 ? (completedItems.length / resources.length) * 100 : 0
  }

  const getCompletedInPhase = (phase) => {
    const phaseResources = getPhaseResources(phase)
    return phaseResources.filter(resource => completedItems.includes(resource.Id)).length
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadLearningPlan} />

  if (!selectedCareer) {
    return (
      <Empty
        title="No Career Path Selected"
        description="Complete the assessment and select a career path to see your personalized learning plan"
        actionText="Take Assessment"
        onAction={() => window.location.href = '/assessment'}
        icon="BookOpen"
      />
    )
  }

  const overallProgress = calculateProgress()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4"
        >
          Your Learning Roadmap
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Personalized learning plan for <span className="font-semibold text-primary-600">{selectedCareer.title}</span>
        </p>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
            <div className="text-4xl font-bold mb-2">{Math.round(overallProgress)}%</div>
            <div className="bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Completed</h3>
            <div className="text-4xl font-bold mb-2">{completedItems.length}</div>
            <p className="text-white/80">of {resources.length} resources</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Time Investment</h3>
            <div className="text-4xl font-bold mb-2">12-18</div>
            <p className="text-white/80">weeks total</p>
          </div>
        </div>
      </motion.div>

      {/* Phase Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {phases.map((phase, index) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(index)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activePhase === index
                ? `bg-${phase.color}-500 text-white shadow-lg`
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
            }`}
          >
            {phase.title}
          </button>
        ))}
      </div>

      {/* Active Phase */}
      <motion.div
        key={activePhase}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {phases[activePhase].title}
              </h2>
              <p className="text-gray-600">{phases[activePhase].description}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Duration</div>
              <div className="font-semibold text-gray-900">{phases[activePhase].duration}</div>
              <div className="text-sm text-gray-500 mt-2">
                {getCompletedInPhase(phases[activePhase].id)}/4 completed
              </div>
            </div>
          </div>
          
          <ProgressBar
            progress={(getCompletedInPhase(phases[activePhase].id) / 4) * 100}
            color={phases[activePhase].color}
            className="mb-6"
          />
          
          <div className="space-y-4">
            {getPhaseResources(phases[activePhase].id).map((resource, index) => (
              <motion.div
                key={resource.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  completedItems.includes(resource.Id)
                    ? 'border-secondary-200 bg-secondary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <button
                      onClick={() => toggleComplete(resource.Id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        completedItems.includes(resource.Id)
                          ? 'border-secondary-500 bg-secondary-500 text-white'
                          : 'border-gray-300 hover:border-secondary-400'
                      }`}
                    >
                      {completedItems.includes(resource.Id) && (
                        <ApperIcon name="Check" size={14} />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-1 ${
                        completedItems.includes(resource.Id) 
                          ? 'text-secondary-700 line-through' 
                          : 'text-gray-900'
                      }`}>
                        {resource.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">{resource.provider}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <ApperIcon name="Clock" size={14} className="mr-1" />
                          {resource.duration}
                        </div>
                        <div className="flex items-center">
                          <ApperIcon name="Tag" size={14} className="mr-1" />
                          {resource.type}
                        </div>
                        <div className="flex items-center">
                          <ApperIcon name="DollarSign" size={14} className="mr-1" />
                          {resource.cost}
                        </div>
                      </div>
                    </div>
</div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="ExternalLink"
                    className="ml-4"
                    onClick={() => openResource(resource)}
                  >
                    Start
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Calendar" size={24} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Schedule Study Time</h3>
          <p className="text-gray-600 mb-4">
            Set up a consistent learning schedule to stay on track
          </p>
          <Button variant="outline" className="w-full">
            Create Schedule
          </Button>
        </Card>
        
        <Card className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Users" size={24} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Join Study Group</h3>
          <p className="text-gray-600 mb-4">
            Connect with others learning similar skills
          </p>
          <Button variant="outline" className="w-full">
            Find Groups
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default LearningPlan