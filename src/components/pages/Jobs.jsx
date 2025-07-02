import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import JobCard from '@/components/molecules/JobCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { jobService } from '@/services/api/jobService'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    salaryRange: '',
    jobType: ''
  })

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await jobService.getAll()
      setJobs(data)
    } catch (err) {
      setError('Failed to load job listings. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = jobs.filter(job => {
    if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !job.company.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    if (filters.salaryRange && !job.salary.includes(filters.salaryRange)) return false
    return true
  })

  const resetFilters = () => {
    setFilters({
      search: '',
      location: '',
      salaryRange: '',
      jobType: ''
    })
  }

  if (loading) return <Loading type="list" />
  if (error) return <Error message={error} onRetry={loadJobs} />

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4"
        >
          Job Opportunities
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover job openings that match your career goals and skill level
        </p>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Input
            placeholder="Search jobs or companies..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            icon="Search"
          />
          
          <Input
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            icon="MapPin"
          />
          
          <select
            value={filters.salaryRange}
            onChange={(e) => setFilters({...filters, salaryRange: e.target.value})}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
          >
            <option value="">Any Salary</option>
            <option value="50k">$50k+</option>
            <option value="75k">$75k+</option>
            <option value="100k">$100k+</option>
            <option value="150k">$150k+</option>
          </select>
          
          <select
            value={filters.jobType}
            onChange={(e) => setFilters({...filters, jobType: e.target.value})}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
          >
            <option value="">Any Type</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
          <Button variant="ghost" onClick={resetFilters} size="sm">
            Clear Filters
          </Button>
        </div>
      </motion.div>

      {/* Job Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-4">
              <ApperIcon name="Bell" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Get Job Alerts</h3>
              <p className="text-gray-600">Be the first to know about new opportunities</p>
            </div>
          </div>
          <Button variant="primary">
            Set Up Alerts
          </Button>
        </div>
      </motion.div>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <Empty 
          title="No jobs match your criteria"
          description="Try adjusting your search terms or filters to find more opportunities"
          actionText="Clear Filters"
          onAction={resetFilters}
          icon="Briefcase"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Positions
            </h2>
            
            <div className="flex items-center space-x-4">
              <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:outline-none">
                <option>Sort by: Relevance</option>
                <option>Sort by: Date Posted</option>
                <option>Sort by: Salary</option>
                <option>Sort by: Company</option>
              </select>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <ApperIcon name="Grid3X3" size={16} />
                </button>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-primary-50 border-primary-200">
                  <ApperIcon name="List" size={16} className="text-primary-600" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <JobCard key={job.Id} job={job} index={index} />
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center pt-8">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="Lightbulb" size={20} className="mr-2 text-accent-600" />
          Job Search Tips
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="FileText" size={20} className="text-primary-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Tailor Your Resume</h4>
            <p className="text-sm text-gray-600">
              Customize your resume for each application to match job requirements
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Users" size={20} className="text-secondary-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Network Actively</h4>
            <p className="text-sm text-gray-600">
              Connect with professionals in your target industry
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Target" size={20} className="text-accent-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Practice Interviews</h4>
            <p className="text-sm text-gray-600">
              Prepare for common questions and practice your responses
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Jobs