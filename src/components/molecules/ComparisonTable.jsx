import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'

const ComparisonTable = ({ careers, selectedCareers, onCareerSelect, onCareerRemove }) => {
  const [sortBy, setSortBy] = useState('matchScore')
  const [sortOrder, setSortOrder] = useState('desc')
  const [experienceFilter, setExperienceFilter] = useState('')
  const [loading, setLoading] = useState(false)

  const sortedCareers = useMemo(() => {
    let sorted = [...careers]
    
    // Apply experience filter
    if (experienceFilter) {
      sorted = sorted.filter(career => 
        career.experienceLevel?.toLowerCase().includes(experienceFilter.toLowerCase())
      )
    }

    // Apply sorting
    sorted.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'matchScore':
          aValue = a.matchScore
          bValue = b.matchScore
          break
        case 'salary':
          aValue = parseInt(a.avgSalary.replace(/[^0-9]/g, ''))
          bValue = parseInt(b.avgSalary.replace(/[^0-9]/g, ''))
          break
        case 'growth':
          const growthOrder = { 'High': 3, 'Above Average': 2, 'Average': 1 }
          aValue = growthOrder[a.growthRate] || 0
          bValue = growthOrder[b.growthRate] || 0
          break
        default:
          return 0
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

    return sorted
  }, [careers, sortBy, sortOrder, experienceFilter])

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const getSortIcon = (column) => {
    if (sortBy !== column) return 'ArrowUpDown'
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'
  }

  const getGrowthColor = (rate) => {
    switch (rate) {
      case 'High': return 'text-green-600 bg-green-100'
      case 'Above Average': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 80) return 'text-blue-600 bg-blue-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  if (loading) return <Loading type="comparison" />

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header and Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-2">
              <ApperIcon name="BarChart3" size={24} className="mr-3 text-primary-600" />
              Career Comparison
            </h2>
            <p className="text-gray-600">
              Compare careers side-by-side to make informed decisions about your future path.
            </p>
          </div>
          
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Filter by Experience:</label>
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:outline-none"
              >
                <option value="">All Levels</option>
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              {sortedCareers.length} career{sortedCareers.length !== 1 ? 's' : ''} available
            </div>
          </div>
        </div>

        {/* Selected Careers Summary */}
        {selectedCareers.length > 0 && (
          <div className="bg-primary-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-primary-900 mb-2 flex items-center">
              <ApperIcon name="CheckCircle" size={16} className="mr-2" />
              Selected for Comparison ({selectedCareers.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCareers.map(career => (
                <span key={career.Id} className="inline-flex items-center bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-900 shadow-sm">
                  {career.title}
                  <button
                    onClick={() => onCareerRemove(career)}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <ApperIcon name="X" size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  <button
                    onClick={() => handleSort('title')}
                    className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
                  >
                    <span>Career</span>
                    <ApperIcon name={getSortIcon('title')} size={14} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  <button
                    onClick={() => handleSort('matchScore')}
                    className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
                  >
                    <span>Match</span>
                    <ApperIcon name={getSortIcon('matchScore')} size={14} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  <button
                    onClick={() => handleSort('salary')}
                    className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
                  >
                    <span>Salary</span>
                    <ApperIcon name={getSortIcon('salary')} size={14} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  <button
                    onClick={() => handleSort('growth')}
                    className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
                  >
                    <span>Growth</span>
                    <ApperIcon name={getSortIcon('growth')} size={14} />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Skills</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCareers.map((career, index) => {
                const isSelected = selectedCareers.some(c => c.Id === career.Id)
                return (
                  <motion.tr
                    key={career.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      isSelected ? 'bg-primary-50' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{career.title}</h3>
                        <p className="text-sm text-gray-600">{career.experienceLevel}</p>
                        <p className="text-xs text-gray-500 mt-1">{career.industry}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMatchScoreColor(career.matchScore)}`}>
                        {career.matchScore}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm font-medium text-gray-900">{career.avgSalary}</div>
                      {career.growthProjection && (
                        <div className="text-xs text-gray-500">{career.growthProjection.rate} growth</div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGrowthColor(career.growthRate)}`}>
                        {career.growthRate}
                      </span>
                      {career.growthProjection && (
                        <div className="text-xs text-gray-500 mt-1">{career.growthProjection.demand} demand</div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {career.requiredSkills?.slice(0, 3).map(skill => (
                          <span key={skill} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {career.requiredSkills?.length > 3 && (
                          <span className="text-xs text-gray-500">+{career.requiredSkills.length - 3} more</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button
                        variant={isSelected ? "outline" : "primary"}
                        size="sm"
                        onClick={() => onCareerSelect(career)}
                        className="text-xs"
                      >
                        {isSelected ? 'Remove' : 'Compare'}
                      </Button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {sortedCareers.map((career, index) => {
            const isSelected = selectedCareers.some(c => c.Id === career.Id)
            return (
              <motion.div
                key={career.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-lg p-4 ${
                  isSelected ? 'border-primary-300 bg-primary-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{career.title}</h3>
                    <p className="text-sm text-gray-600">{career.experienceLevel}</p>
                    <p className="text-xs text-gray-500">{career.industry}</p>
                  </div>
                  <Button
                    variant={isSelected ? "outline" : "primary"}
                    size="sm"
                    onClick={() => onCareerSelect(career)}
                    className="text-xs ml-4"
                  >
                    {isSelected ? 'Remove' : 'Compare'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Match Score</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMatchScoreColor(career.matchScore)}`}>
                      {career.matchScore}%
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Growth Rate</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGrowthColor(career.growthRate)}`}>
                      {career.growthRate}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Salary Range</p>
                  <p className="text-sm font-medium text-gray-900">{career.avgSalary}</p>
                  {career.growthProjection && (
                    <p className="text-xs text-gray-500">{career.growthProjection.rate} projected growth</p>
                  )}
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 mb-2">Key Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {career.requiredSkills?.slice(0, 4).map(skill => (
                      <span key={skill} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {career.requiredSkills?.length > 4 && (
                      <span className="text-xs text-gray-500 self-center">+{career.requiredSkills.length - 4} more</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Detailed Comparison Section */}
        {selectedCareers.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <ApperIcon name="Target" size={20} className="mr-2 text-primary-600" />
              Detailed Comparison
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCareers.map(career => (
                <div key={career.Id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">{career.title}</h4>
                    <button
                      onClick={() => onCareerRemove(career)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <ApperIcon name="X" size={16} />
                    </button>
                  </div>
                  
                  {/* Pros */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                      <ApperIcon name="ThumbsUp" size={14} className="mr-1" />
                      Pros
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {career.pros?.slice(0, 3).map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-1">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Cons */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                      <ApperIcon name="ThumbsDown" size={14} className="mr-1" />
                      Cons
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {career.cons?.slice(0, 3).map((con, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-1">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Growth Projection */}
                  {career.growthProjection && (
                    <div>
                      <h5 className="text-sm font-medium text-blue-700 mb-2 flex items-center">
                        <ApperIcon name="TrendingUp" size={14} className="mr-1" />
                        Growth Outlook
                      </h5>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p><strong>Rate:</strong> {career.growthProjection.rate}</p>
                        <p><strong>Outlook:</strong> {career.growthProjection.outlook}</p>
                        <p><strong>Demand:</strong> {career.growthProjection.demand}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {sortedCareers.length === 0 && (
          <div className="text-center py-12">
            <ApperIcon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No careers match your filters</h3>
            <p className="text-gray-600 mb-4">Try adjusting your experience level filter to see more results.</p>
            <Button variant="outline" onClick={() => setExperienceFilter('')}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ComparisonTable