import api from '../config/apiprofile'

const service = {
  getProfile: async (id) => {
    let res = await api.post('testgetprofile', {citizen:id})
    return res
  },
  editProfileByAdmin: async (data) => {
    api.put('profile/editprofile',{
    citizen: data.id,
    nameTh: data.nameTH,
    lastname_th:data.lastname_th,
    nameEn : data.nameEN,
    lastname_en:data.lastname_en,
    })
  }
}

export default service;
