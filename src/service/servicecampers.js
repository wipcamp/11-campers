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
  },
  checkInCamper: async (data) => {
    api.put('campers/checkin',{
      checked : data.checkIn,
      citizen : data.citizen,
      wifi : data.wifi,
      wipId : data.wipId
    })
  }
    
}

export default service;
