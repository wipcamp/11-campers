import api from '../config/apiAuthService'
import Cookies from 'js-cookie'

const AuthService = {
  login: async (request) => {
  
     let res = await api.post('/auth/login', {
        'provider_name': 'facebook',
        'provider_id': request.userID,
        'accessToken': request.accessToken,
        'role': 1
      })
      if (res) {
        Cookies.set('tokenJWT', res.data.token)
        Cookies.set('wip_Id', res.data.wip_id)
        return res
      }
    
  }
  ,
  getRole: async ()=>{
    return await api.get('/myrole').catch(error =>{
      if(error == 'Request failed with status code 401'){
        
        // Cookies.removeJWTAndWipIdCookie()
        // location.reload()
      }
    })
  }

}

export default AuthService
