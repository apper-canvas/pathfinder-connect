import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Card from '@/components/atoms/Card'
import ProgressBar from '@/components/molecules/ProgressBar'

const AssessmentWizard = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    interests: [],
    currentSkills: [],
    experience: '',
    education: '',
    location: '',
    workStyle: '',
    careerGoals: [],
    salaryExpectation: ''
  })
  
  const steps = [
    {
      id: 'interests',
      title: 'What interests you?',
      subtitle: 'Select areas that excite you professionally',
      component: InterestsStep
    },
    {
      id: 'skills',
      title: 'Current Skills',
      subtitle: 'Rate your proficiency in different areas',
      component: SkillsStep
    },
    {
      id: 'background',
      title: 'Background',
      subtitle: 'Tell us about your experience and education',
      component: BackgroundStep
    },
    {
      id: 'preferences',
      title: 'Work Preferences',
      subtitle: 'What kind of work environment do you prefer?',
      component: PreferencesStep
    },
    {
      id: 'goals',
      title: 'Career Goals',
      subtitle: 'What are you looking to achieve?',
      component: GoalsStep
    }
  ]
  
  const progress = ((currentStep + 1) / steps.length) * 100
  const currentStepData = steps[currentStep]
  const CurrentStepComponent = currentStepData.component
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const handleComplete = () => {
    // Store assessment data
    localStorage.setItem('assessmentData', JSON.stringify(formData))
    toast.success('Assessment completed! Analyzing your results...')
    
    // Navigate to career paths
    setTimeout(() => {
      navigate('/career-paths')
    }, 1000)
  }
  
  const updateFormData = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }))
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <ProgressBar 
          progress={progress} 
          className="mb-6"
          showLabel={false}
        />
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentStepData.title}
          </h1>
          <p className="text-gray-600 text-lg">
            {currentStepData.subtitle}
          </p>
          
          <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-gray-500">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>
      </div>
      
      <Card className="p-8 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent 
              data={formData}
              onUpdate={updateFormData}
            />
          </motion.div>
        </AnimatePresence>
      </Card>
      
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          icon="ArrowLeft"
        >
          Previous
        </Button>
        
        <div className="flex items-center space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStep ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <Button
          onClick={handleNext}
          icon={currentStep === steps.length - 1 ? "CheckCircle" : "ArrowRight"}
          iconPosition="right"
        >
          {currentStep === steps.length - 1 ? 'Complete Assessment' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

// Step Components
const InterestsStep = ({ data, onUpdate }) => {
  const interests = [
    'Technology & Programming',
    'Design & Creativity',
    'Business & Finance',
    'Healthcare & Medicine',
    'Education & Training',
    'Marketing & Sales',
    'Engineering',
    'Data & Analytics',
    'Operations & Management',
    'Customer Service',
    'Research & Development',
    'Legal & Compliance'
  ]
  
  const handleInterestToggle = (interest) => {
    const currentInterests = data.interests || []
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest]
    
    onUpdate({ interests: newInterests })
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interests.map((interest) => (
          <motion.button
            key={interest}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleInterestToggle(interest)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              data.interests?.includes(interest)
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{interest}</span>
              {data.interests?.includes(interest) && (
                <ApperIcon name="Check" size={20} className="text-primary-600" />
              )}
            </div>
          </motion.button>
        ))}
      </div>
      
      <p className="text-sm text-gray-600 mt-6 text-center">
        Select all areas that interest you. You can choose multiple options.
      </p>
    </div>
  )
}

const SkillsStep = ({ data, onUpdate }) => {
  const skillCategories = [
    'Programming',
    'Communication',
    'Leadership',
    'Problem Solving',
    'Creative Thinking',
    'Data Analysis',
    'Project Management',
    'Customer Service',
    'Marketing',
    'Sales'
  ]
  
  const handleSkillChange = (skill, level) => {
    const currentSkills = data.currentSkills || []
    const updatedSkills = currentSkills.filter(s => s.name !== skill)
    updatedSkills.push({ name: skill, level: parseInt(level) })
    
    onUpdate({ currentSkills: updatedSkills })
  }
  
  const getSkillLevel = (skill) => {
    const skillData = data.currentSkills?.find(s => s.name === skill)
    return skillData ? skillData.level : 1
  }
  
  return (
    <div className="space-y-6">
      {skillCategories.map((skill) => (
        <div key={skill} className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-900">{skill}</label>
            <span className="text-sm text-gray-600">
              Level {getSkillLevel(skill)}/10
            </span>
          </div>
          
          <input
            type="range"
            min="1"
            max="10"
            value={getSkillLevel(skill)}
            onChange={(e) => handleSkillChange(skill, e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${getSkillLevel(skill) * 10}%, #e5e7eb ${getSkillLevel(skill) * 10}%, #e5e7eb 100%)`
            }}
          />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const BackgroundStep = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={data.experience || ''}
            onChange={(e) => onUpdate({ experience: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
          >
            <option value="">Select experience level</option>
            <option value="entry">Entry Level (0-2 years)</option>
            <option value="mid">Mid Level (2-5 years)</option>
            <option value="senior">Senior Level (5-10 years)</option>
            <option value="executive">Executive Level (10+ years)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Education Level
          </label>
          <select
            value={data.education || ''}
            onChange={(e) => onUpdate({ education: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
          >
            <option value="">Select education level</option>
            <option value="high-school">High School</option>
            <option value="associate">Associate Degree</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="doctorate">Doctorate</option>
            <option value="other">Other/Professional Certification</option>
          </select>
        </div>
      </div>
      
      <Input
        label="Location"
        placeholder="e.g., New York, NY or Remote"
        value={data.location || ''}
        onChange={(e) => onUpdate({ location: e.target.value })}
        icon="MapPin"
      />
    </div>
  )
}

const PreferencesStep = ({ data, onUpdate }) => {
  const workStyles = [
    { id: 'remote', label: 'Fully Remote', icon: 'Home' },
    { id: 'hybrid', label: 'Hybrid', icon: 'Laptop' },
    { id: 'office', label: 'In-Office', icon: 'Building' },
    { id: 'travel', label: 'Travel Required', icon: 'Plane' },
  ]
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Style Preference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workStyles.map((style) => (
            <motion.button
              key={style.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onUpdate({ workStyle: style.id })}
              className={`p-6 rounded-lg border-2 text-center transition-all duration-200 ${
                data.workStyle === style.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <ApperIcon name={style.icon} size={32} className="mx-auto mb-3" />
              <span className="font-medium">{style.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Salary Expectation
        </label>
        <select
          value={data.salaryExpectation || ''}
          onChange={(e) => onUpdate({ salaryExpectation: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
        >
          <option value="">Select salary range</option>
          <option value="30-50k">$30,000 - $50,000</option>
          <option value="50-75k">$50,000 - $75,000</option>
          <option value="75-100k">$75,000 - $100,000</option>
          <option value="100-150k">$100,000 - $150,000</option>
          <option value="150k+">$150,000+</option>
        </select>
      </div>
    </div>
  )
}

const GoalsStep = ({ data, onUpdate }) => {
  const goals = [
    'Career Change',
    'Skill Development',
    'Leadership Role',
    'Higher Salary',
    'Better Work-Life Balance',
    'Remote Work',
    'Entrepreneurship',
    'Industry Switch'
  ]
  
  const handleGoalToggle = (goal) => {
    const currentGoals = data.careerGoals || []
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal]
    
    onUpdate({ careerGoals: newGoals })
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {goals.map((goal) => (
          <motion.button
            key={goal}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGoalToggle(goal)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              data.careerGoals?.includes(goal)
                ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{goal}</span>
              {data.careerGoals?.includes(goal) && (
                <ApperIcon name="Check" size={20} className="text-secondary-600" />
              )}
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg">
        <div className="flex items-center mb-2">
          <ApperIcon name="Lightbulb" size={20} className="text-accent-600 mr-2" />
          <h4 className="font-semibold text-gray-900">Almost Ready!</h4>
        </div>
        <p className="text-gray-700">
          We'll use your responses to recommend personalized career paths and create a learning plan tailored to your goals.
        </p>
      </div>
    </div>
  )
}

export default AssessmentWizard