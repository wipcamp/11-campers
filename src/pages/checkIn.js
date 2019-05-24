import React, { Component } from 'react';
import Card from '../component/Core/Card';
import { Container, Row, Col } from 'reactstrap';
import socketIOClient from 'socket.io-client'
const socket = socketIOClient('http://localhost:3002')
class checkIn extends Component {

  render() {
    socket.on('personIdClient', (res) => {
      console.log(res)
    })
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}><Card title="Check-in Wip Camp #11" /></Col>
        </Row>
      </Container>
    );
  }
}

export default checkIn;