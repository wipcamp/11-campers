import React, { Component } from 'react';
import Card from '../component/Core/Card';
import { Container, Row, Col } from 'reactstrap';
import socketIOClient from 'socket.io-client'
import RuleText from '../component/Core/RuleWiFiText'
import serviceProfile from '../service/serviceprofile'

const socket = socketIOClient('http://localhost:3002')
class checkIn extends Component {

  render() {
    socket.on('personIdClient', async (res) => {
    let response = await  serviceProfile.getProfile(1101700256341)
    console.log(response)
    })
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }} className="mt-4 p-2">
            <Card 
            title="Wip Camp #11" 
            text={<RuleText />} 
            subtitle="พรบ.คอมพิวเตอร์" 
            textBtn="ดำเนินการต่อ"
            position="row justify-content-end"/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default checkIn;