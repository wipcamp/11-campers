import React, { Component } from 'react';
import Cookies from 'js-cookie'
import CheckIn from '../component/CheckIn'

class checkIn extends Component {
  checkAuth = () =>{
    if(!Cookies.get('JWT')){
      window.location = '/login'
    }
  }
  render() {
   this.checkAuth()
    return (
      <CheckIn/>
    );
  }
}

export default checkIn;