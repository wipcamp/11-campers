import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import CookiesService from 'js-cookie';
import AuthService from '../../service/AuthService'

class LoginFaceBook extends React.Component {
   responseFacebook = async (response) => {
     console.log(response)
   let res = await AuthService.login(response)
   this.changetoRegisterPage(res.data.role)
  }
  changetoRegisterPage = async (role) => {
    try {
      if (CookiesService.get('JWT')) {
        if(parseInt(role) == 10){
          console.log(role,'ok')
          window.location = '/checkin'
        }else{
          console.log(role,'not ok')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
       <FacebookLogin
        scope="email"
        autoLoad={true}
        fields="name,email,picture,id"
        appId="2259610627641637"
        callback={this.responseFacebook}
        render={renderProps => (
          <React.Fragment>
            {/* <ButtonTranparent onClick={renderProps.onClick}> */}
            <button size="large" block type="primary" onClick={renderProps.onClick} >เข้าสู่ระบบ</button>
            {/* </ButtonTranparent> */}
          </React.Fragment>
        )}
      />
       
    )
  }
}

export default LoginFaceBook
