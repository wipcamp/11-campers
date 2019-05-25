import api from '../config/apicampers'

const service =
{
  getScore: async () => {
    return await api.get('test/score')
  },
  insertScore: async (data,header) => {
    return await api.post('campers/score', data, header)
  },
  updateScore: async (data,header) => {
    return await api.put('', data, header)
  }
    
}

export default service;
