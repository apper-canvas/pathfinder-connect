import { toast } from 'react-toastify'

export const careerService = {
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
          { field: { Name: "description" } },
          { field: { Name: "match_score" } },
          { field: { Name: "avg_salary" } },
          { field: { Name: "required_skills" } },
          { field: { Name: "growth_rate" } },
          { field: { Name: "experience_level" } },
          { field: { Name: "industry" } },
          { field: { Name: "pros" } },
          { field: { Name: "cons" } },
          { field: { Name: "growth_projection_rate" } },
          { field: { Name: "growth_projection_outlook" } },
          { field: { Name: "growth_projection_demand" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('career', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      // Transform database fields to match UI expectations
      return response.data.map(career => ({
        Id: career.Id,
        title: career.title,
        description: career.description,
        matchScore: career.match_score,
        avgSalary: career.avg_salary,
        requiredSkills: career.required_skills ? career.required_skills.split('\n') : [],
        growthRate: career.growth_rate,
        experienceLevel: career.experience_level,
        industry: career.industry,
        pros: career.pros ? career.pros.split('\n') : [],
        cons: career.cons ? career.cons.split('\n') : [],
        growthProjection: {
          rate: career.growth_projection_rate,
          outlook: career.growth_projection_outlook,
          demand: career.growth_projection_demand
        }
      }))
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching careers:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error fetching careers:", error.message)
        toast.error("Failed to load careers")
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
          { field: { Name: "description" } },
          { field: { Name: "match_score" } },
          { field: { Name: "avg_salary" } },
          { field: { Name: "required_skills" } },
          { field: { Name: "growth_rate" } },
          { field: { Name: "experience_level" } },
          { field: { Name: "industry" } },
          { field: { Name: "pros" } },
          { field: { Name: "cons" } },
          { field: { Name: "growth_projection_rate" } },
          { field: { Name: "growth_projection_outlook" } },
          { field: { Name: "growth_projection_demand" } }
        ]
      }
      
      const response = await apperClient.getRecordById('career', Id, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      const career = response.data
      return {
        Id: career.Id,
        title: career.title,
        description: career.description,
        matchScore: career.match_score,
        avgSalary: career.avg_salary,
        requiredSkills: career.required_skills ? career.required_skills.split('\n') : [],
        growthRate: career.growth_rate,
        experienceLevel: career.experience_level,
        industry: career.industry,
        pros: career.pros ? career.pros.split('\n') : [],
        cons: career.cons ? career.cons.split('\n') : [],
        growthProjection: {
          rate: career.growth_projection_rate,
          outlook: career.growth_projection_outlook,
          demand: career.growth_projection_demand
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching career with ID ${Id}:`, error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error(`Error fetching career with ID ${Id}:`, error.message)
        toast.error("Failed to load career details")
      }
      return null
    }
  },

  async create(careerData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include Updateable fields
      const params = {
        records: [{
          Name: careerData.title,
          Tags: careerData.tags || '',
          Owner: careerData.owner,
          title: careerData.title,
          description: careerData.description,
          match_score: careerData.matchScore,
          avg_salary: careerData.avgSalary,
          required_skills: Array.isArray(careerData.requiredSkills) 
            ? careerData.requiredSkills.join('\n') 
            : careerData.requiredSkills,
          growth_rate: careerData.growthRate,
          experience_level: careerData.experienceLevel,
          industry: careerData.industry,
          pros: Array.isArray(careerData.pros) 
            ? careerData.pros.join('\n') 
            : careerData.pros,
          cons: Array.isArray(careerData.cons) 
            ? careerData.cons.join('\n') 
            : careerData.cons,
          growth_projection_rate: careerData.growthProjection?.rate,
          growth_projection_outlook: careerData.growthProjection?.outlook,
          growth_projection_demand: careerData.growthProjection?.demand
        }]
      }
      
      const response = await apperClient.createRecord('career', params)
      
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
          toast.success('Career created successfully')
          return successfulRecords[0].data
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating career:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error creating career:", error.message)
        toast.error("Failed to create career")
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
          ...(updates.description && { description: updates.description }),
          ...(updates.matchScore && { match_score: updates.matchScore }),
          ...(updates.avgSalary && { avg_salary: updates.avgSalary }),
          ...(updates.requiredSkills && { 
            required_skills: Array.isArray(updates.requiredSkills) 
              ? updates.requiredSkills.join('\n') 
              : updates.requiredSkills 
          }),
          ...(updates.growthRate && { growth_rate: updates.growthRate }),
          ...(updates.experienceLevel && { experience_level: updates.experienceLevel }),
          ...(updates.industry && { industry: updates.industry }),
          ...(updates.pros && { 
            pros: Array.isArray(updates.pros) 
              ? updates.pros.join('\n') 
              : updates.pros 
          }),
          ...(updates.cons && { 
            cons: Array.isArray(updates.cons) 
              ? updates.cons.join('\n') 
              : updates.cons 
          }),
          ...(updates.growthProjection?.rate && { growth_projection_rate: updates.growthProjection.rate }),
          ...(updates.growthProjection?.outlook && { growth_projection_outlook: updates.growthProjection.outlook }),
          ...(updates.growthProjection?.demand && { growth_projection_demand: updates.growthProjection.demand })
        }]
      }
      
      const response = await apperClient.updateRecord('career', params)
      
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
          toast.success('Career updated successfully')
          return successfulUpdates[0].data
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating career:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error updating career:", error.message)
        toast.error("Failed to update career")
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
      
      const response = await apperClient.deleteRecord('career', params)
      
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
          toast.success('Career deleted successfully')
          return true
        }
      }
      
      return false
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting career:", error?.response?.data?.message)
        toast.error(error.response.data.message)
      } else {
        console.error("Error deleting career:", error.message)
        toast.error("Failed to delete career")
      }
      return false
    }
  }
}