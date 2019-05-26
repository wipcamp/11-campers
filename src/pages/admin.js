import React, { Component } from 'react';
import Cookies from 'js-cookie'
import Admin from '../component/Admin'

class admin extends Component {
  checkAuth = () =>{
    if(!Cookies.get('JWT')){
      window.location = '/login'
    }
  }
  render() {
   this.checkAuth()
    return (
      <Admin/>
    );
  }
}

export default admin;