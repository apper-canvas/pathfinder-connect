import learningData from '@/services/mockData/learning.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const learningService = {
  async getAll() {
    await delay(300)
    return [...learningData]
  },

  async getById(Id) {
    await delay(200)
    const resource = learningData.find(r => r.Id === Id)
    if (!resource) {
      throw new Error(`Learning resource with Id ${Id} not found`)
    }
    return { ...resource }
  },

  async create(resource) {
    await delay(400)
    const maxId = Math.max(...learningData.map(r => r.Id))
    const newResource = { ...resource, Id: maxId + 1 }
    learningData.push(newResource)
    return { ...newResource }
  },

  async update(Id, updates) {
    await delay(300)
    const index = learningData.findIndex(r => r.Id === Id)
    if (index === -1) {
      throw new Error(`Learning resource with Id ${Id} not found`)
    }
    learningData[index] = { ...learningData[index], ...updates }
    return { ...learningData[index] }
  },

  async delete(Id) {
    await delay(250)
    const index = learningData.findIndex(r => r.Id === Id)
    if (index === -1) {
      throw new Error(`Learning resource with Id ${Id} not found`)
    }
    const deleted = learningData.splice(index, 1)[0]
    return { ...deleted }
  }
}