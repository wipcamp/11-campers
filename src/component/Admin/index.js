import React, { Component } from 'react';
import CookiesService from 'js-cookie';
import AuthService from '../../service/AuthService'
import { Redirect } from 'react-router'
import Swl from 'sweetalert2'
import Bg from '../Core/Background'



class index extends Component {

  state = {
    redirect: false
  }

  componentDidMount() {
    this.checkCookie()
  }

  checkRole = async () => {
    let role = await AuthService.getRole()
    try {
      if (role != 10) {
        Swl.fire(
          'คุณไม่ได้รับสิทธิ์ให้ใช้งาน'
        )
        this.setState({
          redirect: true
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  checkCookie = async () => {
    try {
      if (CookiesService.get('JWT') == null) {
        this.setState({
          redirect: true
        })
      } else {
        this.setState({
          redirect: false
        })
      }
    } catch (e) {
    }
  }


  render() {
    if (this.state.redirect) {
      return <Redirect push to="/login" />
    }
    return (
      <Bg height="100vh">
        hi
      </Bg>
    );
  }
}

export default index;