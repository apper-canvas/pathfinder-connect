import { toast } from 'react-toastify'

export const learningService = {
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
          { field: { Name: "type" } },
          { field: { Name: "provider" } },
          { field: { Name: "duration" } },
          { field: { Name: "cost" } },
          { field: { Name: "url" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('learning_resource', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      // Transform database fields to match UI expectations
      return response.data.map(resource => ({
        Id: resource.Id,
        title: resource.title,
        type: resource.type,
        provider: resource.provider,
        duration: resource.duration,
        cost: resource.cost,
        url: resource.url
      }))
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching learning resources:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error fetching learning resources:", error.message)
        toast.error("Failed to load learning resources")
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
          { field: { Name: "type" } },
          { field: { Name: "provider" } },
          { field: { Name: "duration" } },
          { field: { Name: "cost" } },
          { field: { Name: "url" } }
        ]
      }
      
      const response = await apperClient.getRecordById('learning_resource', Id, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      const resource = response.data
      return {
        Id: resource.Id,
        title: resource.title,
        type: resource.type,
        provider: resource.provider,
        duration: resource.duration,
        cost: resource.cost,
        url: resource.url
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching learning resource with ID ${Id}:`, error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error(`Error fetching learning resource with ID ${Id}:`, error.message)
        toast.error("Failed to load learning resource")
      }
      return null
    }
  },

  async create(resourceData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const params = {
        records: [{
          Name: resourceData.title,
          Tags: resourceData.tags || '',
          Owner: resourceData.owner,
          title: resourceData.title,
          type: resourceData.type,
          provider: resourceData.provider,
          duration: resourceData.duration,
          cost: resourceData.cost,
          url: resourceData.url
        }]
      }
      
      const response = await apperClient.createRecord('learning_resource', params)
      
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
          toast.success('Learning resource created successfully')
          return successfulRecords[0].data
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating learning resource:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error creating learning resource:", error.message)
        toast.error("Failed to create learning resource")
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
          ...(updates.type && { type: updates.type }),
          ...(updates.provider && { provider: updates.provider }),
          ...(updates.duration && { duration: updates.duration }),
          ...(updates.cost && { cost: updates.cost }),
          ...(updates.url && { url: updates.url })
        }]
      }
      
      const response = await apperClient.updateRecord('learning_resource', params)
      
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
          toast.success('Learning resource updated successfully')
          return successfulUpdates[0].data
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating learning resource:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error updating learning resource:", error.message)
        toast.error("Failed to update learning resource")
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
      
      const response = await apperClient.deleteRecord('learning_resource', params)
      
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
          toast.success('Learning resource deleted successfully')
          return true
        }
      }
      
      return false
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting learning resource:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error deleting learning resource:", error.message)
        toast.error("Failed to delete learning resource")
      }
      return false
    }
  }
}