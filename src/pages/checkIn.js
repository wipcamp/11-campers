import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import styled from 'styled-components'
import swl from 'sweetalert2'
import Card from '../component/Core/Card';
import Bg from '../component/Core/Background'
import RuleText from '../component/Core/RuleWiFiText'
import service from '../service/serviceprofile';

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
    height: '',
    subtitle: "พรบ.คอมพิวเตอร์"
  }

  handleClick = (e) => {
    if (e.target.checked) {
      this.setState({ showBtn: 'inherit' })
    } else {
      this.setState({ showBtn: 'hidden' })
    }
  }

  showID = () => {
    this.setState({
      showID: true,
      height: '100vh',
      subtitle: 'ยืนยันชื่อ-นามสกุล'
    })
    this.getID()
    swl.fire(
      'กรุณาเสียบบัตรประชาชน'
    )
  }

  getID = async (e) => {
    socket.on('personIdClient', async (res) => {
      this.setState({
        id: res
      })
      let response = await service.getProfile(res)
      console.log(res)
    })
  }

  getPhoto() {
    socket.on('photoClient', (res) => {
      const imgStr = String.fromCharCode.apply(null, new Uint8Array(res));
      this.setState({
        photo: imgStr
      })
    })
  }

  render() {
    this.getID()
    this.getPhoto()
    return (
      <React.Fragment>
        <Bg height={this.state.height}>
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }} className="p-5" style={{ zIndex: 10 }}>
                <Card
                  title="Wip Camp #11"
                  text={this.state.showID ?
                    <div>
                      <img src={`data:image/jpeg;base64,${btoa(this.state.photo)}`}/>
                    </div> : <RuleText />}
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