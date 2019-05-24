import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
const socket = socketIOClient('http://localhost:3002')
class checkIn extends Component {
  
  render() {
    socket.on('personIdClient' ,(res) => {
      console.log(res)
    })
    return (
      <div>
        
      </div>
    );
  }
}

export default checkIn;