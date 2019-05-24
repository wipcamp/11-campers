import React, { Component } from 'react';
import Card from '../component/Core/Card';
import { Container, Row, Col } from 'reactstrap';

class checkIn extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}><Card title="Check-in Wip Camp #11"/></Col>
        </Row>
      </Container>
    );
  }
}

export default checkIn;