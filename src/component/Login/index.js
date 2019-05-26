import React, { Component } from 'react';
import ButtonLogin from './LoginFaceBook'
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components'
import Bg from '../Core/Background'

// const Button = styled(ButtonLogin)`
//   margin-top:100%;
//   background-color : #000;
// `

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