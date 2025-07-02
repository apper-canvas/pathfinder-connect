import careerData from '@/services/mockData/careers.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const careerService = {
  async getAll() {
    await delay(300)
    return [...careerData]
  },

  async getById(Id) {
    await delay(200)
    const career = careerData.find(c => c.Id === Id)
    if (!career) {
      throw new Error(`Career with Id ${Id} not found`)
    }
    return { ...career }
  },

  async create(career) {
    await delay(400)
    const maxId = Math.max(...careerData.map(c => c.Id))
    const newCareer = { ...career, Id: maxId + 1 }
    careerData.push(newCareer)
    return { ...newCareer }
  },

  async update(Id, updates) {
    await delay(300)
    const index = careerData.findIndex(c => c.Id === Id)
    if (index === -1) {
      throw new Error(`Career with Id ${Id} not found`)
    }
    careerData[index] = { ...careerData[index], ...updates }
    return { ...careerData[index] }
  },

  async delete(Id) {
    await delay(250)
    const index = careerData.findIndex(c => c.Id === Id)
    if (index === -1) {
      throw new Error(`Career with Id ${Id} not found`)
    }
    const deleted = careerData.splice(index, 1)[0]
    return { ...deleted }
  }
}