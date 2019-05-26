import React, { Component } from 'react';
import ButtonLogin from './LoginFaceBook'
import { Container, Row, Col } from 'reactstrap';
import Bg from '../Core/Background'

class index extends Component {
  render() {
    return (
      <Bg height="100vh">
      <Container className="p-5">
        <Row >
          <Col className="mt-5"   md={{size: 2,offset : 5}}>
            <div className="mt-5">
            <ButtonLogin className=""/>
            </div>
          </Col>
        </Row>
      </Container>
      </Bg>
    );
  }
}

export default index;