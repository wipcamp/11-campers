import React, { Component } from 'react';
import Card from '../component/Core/Card';
import socketIOClient from 'socket.io-client'
import RuleText from '../component/Core/RuleWiFiText'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import Bg from '../component/Core/Background'
import styled from 'styled-components'
import swl from 'sweetalert2'
import service from './../service/service'

const Btn = styled.div`
  visibility : ${props => props.show};
`
const socket = socketIOClient('http://localhost:3002')

class checkIn extends Component {
  state = {
    id: null,
    photo: null,
    showBtn: 'hidden',
    showID: false,
    height : '',
    subtitle : "พรบ.คอมพิวเตอร์"
  }

  handleClick = (e) => {
    if (e.target.checked) {
      this.setState({ showBtn: 'inherit' })
    } else {
      this.setState({ showBtn: 'hidden' })
    }
  }

  showID = () => {
    swl.fire(
      'กรุณาเสียบบัตรประชาชน'
    )
    this.setState({
      showID: true,
      height: '100vh',
      subtitle:'ยืนยันชื่อ-นามสกุล'
    })
  }

  getID = async (e) => {
    socket.on('personIdClient', (res) => {
      this.setState({
        id: res
      })
      console.log(res)
    })
  }

  getPhoto() {
    const file = new 
    socket.on('photoClient', (res) => {
      this.setState({
        photo: res.data
      })
      console.log(res.data)
    })
  }

  render() {
    this.getID()
    return (
      <React.Fragment>
        <Bg height={this.state.height}>
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }} className="p-5" style={{ zIndex: 10 }}>
                <Card
                  title="Wip Camp #11"
                  text={this.state.showID ? this.state.id : <RuleText />}
                  subtitle={this.state.subtitle}
                  position="row justify-content-end" >
                </Card>
                <div className="text-center" >
                  <Input type="checkbox" required
                    onClick={(e) => this.handleClick(e)} />
                  ยอมรับเงื่อนไข
                 </div>
                <Btn className="text-right" show={this.state.showBtn}>
                  <Button onClick={(e) => this.showID(e)}>ดำเนินการต่อ </Button>
                </Btn>
              </Col>
            </Row>
          </Container>
        </Bg>
      </React.Fragment>
    );
  }
}

export default checkIn;