import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import styled from 'styled-components'
import swl from 'sweetalert2'
import Card from '../Core/Card';
import Bg from '../Core/Background'
import RuleText from '../Core/RuleWiFiText'
import service from '../../service/serviceprofile';

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
    subtitle: "พ.ร.บ.คอมพิวเตอร์",
    nameTH: '',
    nameEN: '',
    checkdata : 'ดำเนินการต่อ'
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
      subtitle: 'ยืนยันชื่อ-นามสกุล',
      checkdata : 'ยืนยันข้อมูล'
    })
    this.getPerson()
    // swl.fire(
    //   'กรุณาเสียบบัตรประชาชน'
    // )
  }

  getPerson = async (e) => {
    socket.on('personClient', async (res) => {
      console.log(res)
      let response = await service.getProfile(res.id)
      const imgStr = String.fromCharCode.apply(null, new Uint8Array(res.photo));
      this.setState({
        id: res.id,
        nameTH: response.data.profile.firstname_th + " " + response.data.profile.lastname_th,
        nameEN: response.data.profile.firstname_en + " " + response.data.profile.lastname_en,
        photo: imgStr
      })
      console.log(response)
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
    this.getPerson()
    return (
      <React.Fragment>
        <Bg height={this.state.height}>
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }} className="p-5" style={{ zIndex: 10 }}>
                <Card
                  title="Wip Camp #11"
                  text={this.state.showID ?
                    <Row>
                      <Col md={{ size: 3}}>
                        <img src={`data:image/jpeg;base64,${btoa(this.state.photo)}`} />
                      </Col>
                      <Col md={{ size: 9}}>
                        ข้อมูลส่วนตัว (กรุณาตรวจสอบข้อมูล)<br/>
                        เลขบัตรประชำตัว : {this.state.id}<br/>
                        ชื่อ-นามสกุล (ไทย) :  {this.state.nameTH} <br/>
                        ชื่อ-นามสกุล (อังกฤษ) : {this.state.nameEN} <br/>
                        <br/>
                        ข้อมูลค่าย <br/>
                        รส :  <br/>
                        ห้องพัก : <br/>
                      </Col>
                    </Row>
                    : <RuleText />}
                  subtitle={this.state.subtitle}
                  position="row justify-content-end" >
                </Card>
                <div className="text-center" >
                  <Input type="checkbox" required
                    onClick={(e) => this.handleClick(e)} />
                  ยอมรับเงื่อนไข
                 </div>
                <Btn className="text-right" show={this.state.showBtn}>
                  <Button onClick={(e) => this.showID(e)}>{this.state.checkdata}</Button>
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