import api from '../config/apiprofile'
import Swal from 'sweetalert2'

const service = {
  getProfile: async (id) => {
    try {
    return await api.post('testgetprofile', {citizen:id})
    } catch (error) {
        Swal.fire({
          title: '<strong>คำเตือน !</strong>',
          type: 'warning',
          html:
            'ขออภัยเกิดข้อผิดพลาด' +
            'กรุณาติดต่อผู้ดูแลระบบ',
          showCloseButton: true,
          showCancelButton: false,
          showConfirmButton: false
        }).then(()=>{
          window.location.reload();
        })
    }
  },
  editProfileByAdmin: async (data) => {
    try {
      return api.put('profile/editprofile',{
      citizen: data.id,
      nameTh: data.nameTH,
      lastname_th:data.lastname_th,
      nameEn : data.nameEN,
      lastname_en:data.lastname_en,
      })
    } catch (error) {
       Swal.fire({
          title: '<strong>คำเตือน !</strong>',
          type: 'warning',
          html:
            'ขออภัยเกิดข้อผิดพลาด' +
            'กรุณาติดต่อผู้ดูแลระบบ',
          showCloseButton: true,
          showCancelButton: false,
          showConfirmButton: false
        }).then(()=>{
          window.location.reload();
        })
    }
  }
}

export default service;
