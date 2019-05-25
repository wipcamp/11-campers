import api from '../config/apiprofile'

const service =
{
  getProfile: async (id) => {
    let res = await api.post('testgetprofile', {citizen:id})
    return res
  }
    
}

export default service;
