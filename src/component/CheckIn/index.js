import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import styled from 'styled-components'
import Card from '../Core/Card';
import Bg from '../Core/Background'
import RuleText from '../Core/RuleWiFiText'
import service from '../../service/serviceprofile';
import CamperService from '../../service/servicecampers'

const socket = socketIOClient(process.env.REACT_APP_PATH_SOCKET)

const Img = styled.img`
  width: 100%;
  margin-bottom:5%;
`

const Btn = styled.div`
  visibility : ${props => props.show};
`

const BtnCon = styled.div`
  visibility : ${props => props.show};
`
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
    checkdata: 'ดำเนินการต่อ',
    img: '/img/insteadcitizenpic.jpg',
    over: false,
    showConfirm: 'hidden',
    wifi: false
  }

  handleCheck = (e) => {
    if (e.target.checked) {
      this.setState({ showBtn: 'inherit', showConfirm: 'hidden' })
    }
  }

  showID = () => {
    this.setState({
      showID: true,
      height: '100vh',
      subtitle: 'ยืนยันชื่อ-นามสกุล',
      showConfirm: 'inherit',
      showBtn: 'hidden',
      wifi: true
    })
    this.getPerson()
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
    })
  }


  handleData = (e) => {
    const { id, wifi } = this.state
    CamperService.checkInCamper({ checkIn: "checked", citizen: id, wifi: wifi })
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
                      <Col md={{ size: 3 }}>
                        <Img src={this.state.over ? `data:image/jpeg;base64,${btoa(this.state.photo)}` : this.state.img}
                          onMouseOver={() => this.setState({ over: true })} />
                      </Col>
                      <Col md={{ size: 9 }}>
                        ข้อมูลส่วนตัว (กรุณาตรวจสอบข้อมูล)<br />
                        เลขบัตรประจำตัว : {this.state.id}<br />
                        ชื่อ-นามสกุล (ไทย) :  {this.state.nameTH} <br />
                        ชื่อ-นามสกุล (อังกฤษ) : {this.state.nameEN} <br />
                        <br />
                        ข้อมูลค่าย <br />
                        รส :  <br />
                        ห้องพัก : <br />
                      </Col>
                    </Row>
                    : <RuleText />}
                  subtitle={this.state.subtitle}
                  position="row justify-content-end" >
                </Card>
                <div className="text-center" >
                  <Input type="checkbox" required
                    onClick={(e) => this.handleCheck(e)} />
                  ยอมรับเงื่อนไข
                 </div>
                <Btn className="text-right" show={this.state.showBtn}>
                  <Button onClick={(e) => this.showID(e)}>ดำเนินการต่อ</Button>
                </Btn>
                <BtnCon className="text-right" show={this.state.showConfirm}>
                  <Button onClick={(e) => this.handleData(e)}>ยืนยันข้อมูล</Button>
                </BtnCon>
              </Col>
            </Row>
          </Container>
        </Bg>
      </React.Fragment>
    );
  }
}

export default checkIn;