import { toast } from 'react-toastify'

export const jobService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title" } },
          { field: { Name: "company" } },
          { field: { Name: "location" } },
          { field: { Name: "salary" } },
          { field: { Name: "requirements" } },
          { field: { Name: "url" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('job', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      // Transform database fields to match UI expectations
      return response.data.map(job => ({
        Id: job.Id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        requirements: job.requirements ? job.requirements.split('\n') : [],
        url: job.url
      }))
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching jobs:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error fetching jobs:", error.message)
        toast.error("Failed to load jobs")
      }
      return []
    }
  },

  async getById(Id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title" } },
          { field: { Name: "company" } },
          { field: { Name: "location" } },
          { field: { Name: "salary" } },
          { field: { Name: "requirements" } },
          { field: { Name: "url" } }
        ]
      }
      
      const response = await apperClient.getRecordById('job', Id, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      const job = response.data
      return {
        Id: job.Id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        requirements: job.requirements ? job.requirements.split('\n') : [],
        url: job.url
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching job with ID ${Id}:`, error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error(`Error fetching job with ID ${Id}:`, error.message)
        toast.error("Failed to load job details")
      }
      return null
    }
  },

  async create(jobData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const params = {
        records: [{
          Name: jobData.title,
          Tags: jobData.tags || '',
          Owner: jobData.owner,
          title: jobData.title,
          company: jobData.company,
          location: jobData.location,
          salary: jobData.salary,
          requirements: Array.isArray(jobData.requirements) 
            ? jobData.requirements.join('\n') 
            : jobData.requirements,
          url: jobData.url
        }]
      }
      
      const response = await apperClient.createRecord('job', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulRecords.length > 0) {
          toast.success('Job created successfully')
          return successfulRecords[0].data
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating job:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error creating job:", error.message)
        toast.error("Failed to create job")
      }
      return null
    }
  },

  async update(Id, updates) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const params = {
        records: [{
          Id: Id,
          ...(updates.title && { Name: updates.title, title: updates.title }),
          ...(updates.tags && { Tags: updates.tags }),
          ...(updates.owner && { Owner: updates.owner }),
          ...(updates.company && { company: updates.company }),
          ...(updates.location && { location: updates.location }),
          ...(updates.salary && { salary: updates.salary }),
          ...(updates.requirements && { 
            requirements: Array.isArray(updates.requirements) 
              ? updates.requirements.join('\n') 
              : updates.requirements 
          }),
          ...(updates.url && { url: updates.url })
        }]
      }
      
      const response = await apperClient.updateRecord('job', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulUpdates.length > 0) {
          toast.success('Job updated successfully')
          return successfulUpdates[0].data
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating job:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error updating job:", error.message)
        toast.error("Failed to update job")
      }
      return null
    }
  },

  async delete(Id) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        RecordIds: [Id]
      }
      
      const response = await apperClient.deleteRecord('job', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulDeletions.length > 0) {
          toast.success('Job deleted successfully')
          return true
        }
      }
      
      return false
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting job:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error deleting job:", error.message)
        toast.error("Failed to delete job")
      }
      return false
    }
  }
}