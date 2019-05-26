import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import CookiesService from 'js-cookie';
import AuthService from '../../service/AuthService'
import { Button } from 'reactstrap';
import { Redirect } from 'react-router'
import Swl from 'sweetalert2'

class LoginFaceBook extends React.Component {

  state = {
    redirect: false
  }


  responseFacebook = async (response) => {
    let res = await AuthService.login(response)
    this.changetoRegisterPage(res.data.role)
  }

  changetoRegisterPage = async (role) => {
    try {
      if (CookiesService.get('JWT')) {
        if (parseInt(role) === 10) {
          this.setState({
            redirect : true
          })
        } else {
          Swl.fire(
            'คุณไม่ได้รับสิทธิ์ให้ใช้งาน'
          )
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    if (this.state.redirect) {
      return <Redirect push to="/admin" />
    }
    return (
      <FacebookLogin
        scope="email"
        autoLoad={false}
        fields="name,email,picture,id"
        appId="2259610627641637"
        callback={this.responseFacebook}
        render={renderProps => (
          <React.Fragment>
            {/* <ButtonTranparent onClick={renderProps.onClick}> */}
            <Button size="large" block type="primary" onClick={renderProps.onClick} >เข้าสู่ระบบ</Button>
            {/* </ButtonTranparent> */}
          </React.Fragment>
        )}
      />

    )
  }
}

export default LoginFaceBook
