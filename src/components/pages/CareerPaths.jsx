import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import CareerCard from '@/components/molecules/CareerCard'
import ComparisonTable from '@/components/molecules/ComparisonTable'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import { careerService } from '@/services/api/careerService'

const CareerPaths = () => {
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isComparisonMode, setIsComparisonMode] = useState(false)
  const [selectedCareers, setSelectedCareers] = useState([])
  const [filters, setFilters] = useState({
    matchScore: 0,
    salaryRange: '',
    growthRate: ''
  })

  useEffect(() => {
    loadCareers()
  }, [])

  const loadCareers = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await careerService.getAll()
      setCareers(data)
    } catch (err) {
      setError('Failed to load career paths. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredCareers = careers.filter(career => {
    if (filters.matchScore > 0 && career.matchScore < filters.matchScore) return false
    if (filters.salaryRange && !career.avgSalary.includes(filters.salaryRange)) return false
    if (filters.growthRate && career.growthRate !== filters.growthRate) return false
    return true
  })

  const resetFilters = () => {
    setFilters({
      matchScore: 0,
      salaryRange: '',
      growthRate: ''
    })
  }

  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadCareers} />

const toggleCareerSelection = (career) => {
    setSelectedCareers(prev => {
      const isSelected = prev.some(c => c.Id === career.Id)
      if (isSelected) {
        return prev.filter(c => c.Id !== career.Id)
      } else {
        return [...prev, career]
      }
    })
  }

  const handleComparisonMode = () => {
    setIsComparisonMode(!isComparisonMode)
    if (!isComparisonMode) {
      setSelectedCareers([])
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4"
        >
          Your Career Recommendations
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Based on your assessment, we've found careers that match your interests, skills, and goals.
        </p>
        
        {/* Comparison Mode Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isComparisonMode ? "primary" : "outline"}
            onClick={handleComparisonMode}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="BarChart3" size={16} />
            <span>
              {isComparisonMode ? 'Exit Comparison' : 'Compare Careers'}
            </span>
          </Button>
          {isComparisonMode && (
            <span className="text-sm text-gray-600">
              {selectedCareers.length} career{selectedCareers.length !== 1 ? 's' : ''} selected
            </span>
          )}
        </div>
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <ApperIcon name="Filter" size={20} className="mr-2 text-primary-600" />
            Filter Results
          </h2>
          <Button variant="ghost" onClick={resetFilters} size="sm">
            Clear All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Match Score
            </label>
            <select
              value={filters.matchScore}
              onChange={(e) => setFilters({...filters, matchScore: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            >
              <option value={0}>Any</option>
              <option value={70}>70%+</option>
              <option value={80}>80%+</option>
              <option value={90}>90%+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <select
              value={filters.salaryRange}
              onChange={(e) => setFilters({...filters, salaryRange: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            >
              <option value="">Any</option>
              <option value="50k">$50k+</option>
              <option value="75k">$75k+</option>
              <option value="100k">$100k+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Growth Rate
            </label>
            <select
              value={filters.growthRate}
              onChange={(e) => setFilters({...filters, growthRate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            >
              <option value="">Any</option>
              <option value="High">High Growth</option>
              <option value="Average">Average Growth</option>
              <option value="Above Average">Above Average</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      {filteredCareers.length === 0 ? (
        <Empty 
          title="No careers match your filters"
          description="Try adjusting your filter criteria to see more results"
          actionText="Clear Filters"
          onAction={resetFilters}
          icon="Search"
        />
) : isComparisonMode ? (
        <ComparisonTable 
          careers={filteredCareers}
          selectedCareers={selectedCareers}
          onCareerSelect={toggleCareerSelection}
          onCareerRemove={(career) => setSelectedCareers(prev => prev.filter(c => c.Id !== career.Id))}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredCareers.length} career path{filteredCareers.length !== 1 ? 's' : ''} 
              {filteredCareers.length !== careers.length && ` of ${careers.length} total`}
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <ApperIcon name="Lightbulb" size={16} />
              <span>
                {isComparisonMode 
                  ? "Select careers to compare side-by-side" 
                  : "Click any career to see detailed requirements"}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career, index) => (
              <CareerCard 
                key={career.Id} 
                career={career} 
                index={index}
                isComparisonMode={isComparisonMode}
                isSelected={selectedCareers.some(c => c.Id === career.Id)}
                onSelect={() => toggleCareerSelection(career)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CareerPaths