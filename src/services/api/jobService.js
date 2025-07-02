import jobData from '@/services/mockData/jobs.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const jobService = {
  async getAll() {
    await delay(350)
    return [...jobData]
  },

  async getById(Id) {
    await delay(200)
    const job = jobData.find(j => j.Id === Id)
    if (!job) {
      throw new Error(`Job with Id ${Id} not found`)
    }
    return { ...job }
  },

  async create(job) {
    await delay(400)
    const maxId = Math.max(...jobData.map(j => j.Id))
    const newJob = { ...job, Id: maxId + 1 }
    jobData.push(newJob)
    return { ...newJob }
  },

  async update(Id, updates) {
    await delay(300)
    const index = jobData.findIndex(j => j.Id === Id)
    if (index === -1) {
      throw new Error(`Job with Id ${Id} not found`)
    }
    jobData[index] = { ...jobData[index], ...updates }
    return { ...jobData[index] }
  },

  async delete(Id) {
    await delay(250)
    const index = jobData.findIndex(j => j.Id === Id)
    if (index === -1) {
      throw new Error(`Job with Id ${Id} not found`)
    }
    const deleted = jobData.splice(index, 1)[0]
    return { ...deleted }
  }
}