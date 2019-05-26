import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import styled from 'styled-components'
import Card from '../Core/Card';
import Bg from '../Core/Background'
import RuleText from '../Core/RuleWiFiText'
import service from '../../service/serviceprofile';
import CamperService from '../../service/servicecampers'
import Swal from 'sweetalert2'

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
    wifi: false,
    flavor: '',
    room: '',
    wipId : null,
    reload : false,
    lastnameTH : '',
    lastnameEN : ''
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

  getPerson = async () => {
    socket.on('personClient', async (res) => {
      let response = await service.getProfile(res.id)
      this.setFlavor(response.data.camper.flavor_id)
      const imgStr = String.fromCharCode.apply(null, new Uint8Array(res.photo));
      try {
        this.setState({
          id: res.id,
          nameTH: response.data.profile.firstname_th,
          lastnameTH: response.data.profile.lastname_th,
          nameEN: response.data.profile.firstname_en,
          lastnameEN: response.data.profile.lastname_en,
          photo: imgStr,
          room : response.data.camper.bed_room
        })
      } catch (error) {
        Swal.fire({
          title: '<strong>คำเตือน !</strong>',
          type: 'warning',
          html:
            'ขออภัยเกิดข้อผิดพลาด<br/>' +
            'คุณอาจไม่มีข้อมูลในระบบ<br/>'+
            'กรุณาติดต่อผู้ดูแลระบบ<br/><br/>',
          showCloseButton: true,
          showCancelButton: false,
          showConfirmButton: false
        }).then(()=>{
          window.location.reload();
        })
      }
    })
  }

  setFlavor = (id) => {
    switch (id) {
      case 1: this.setState({ flavor: 'สีดำ' })
      break;
      case 2: this.setState({ flavor: 'สีส้ม' })
      break;
      case 3: this.setState({ flavor: 'สีแดง' })
      break;
      case 4: this.setState({ flavor: 'สีฟ้า' })
      break;
      case 5: this.setState({ flavor: 'สีเขียว' })
      break;
      case 6: this.setState({ flavor: 'สีน้ำตาล' })
      break;
      case 7: this.setState({ flavor: 'สีเหลือง' })
      break;
      case 8: this.setState({ flavor: 'สีม่วง' })
      break;
      case 9: this.setState({ flavor: 'สีชมพู' })
      break;
      case 10: this.setState({ flavor: 'สีเขียวแก่' })
      break;
      case null:this.setState({flavor : 'ไม่มีสี'})
        break;

      default :
        break;
    }
  }


  handleData = async (e) => {
    const { id, wifi, wipId } = this.state
    await CamperService.checkInCamper({ checkIn: "checked", citizen: id, wifi: wifi ,wipId : wipId})
      Swal.fire({
        type: 'success',
        title: 'สำเร็จ',
        text: 'ยืนยันข้อมูลเรียบร้อยแล้ว',
      }).then(()=>{
        window.location.reload();
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
                      <Col md={{ size: 3 }}>
                        <Img src={this.state.over ? `data:image/jpeg;base64,${btoa(this.state.photo)}` : this.state.img}
                          onMouseOver={() => this.setState({ over: true })} />
                      </Col>
                      <Col md={{ size: 9 }}>
                        ข้อมูลส่วนตัว (กรุณาตรวจสอบข้อมูล)<br />
                        เลขบัตรประจำตัว : {this.state.id}<br />
                        ชื่อ-นามสกุล (ไทย) :  {this.state.nameTH} {this.state.lastnameTH}<br />
                        ชื่อ-นามสกุล (อังกฤษ) : {this.state.nameEN} {this.state.lastnameEN}<br />
                        <br />
                        ข้อมูลค่าย <br />
                        รส :  {this.state.flavor}<br />
                        ห้องพัก : {this.state.room}<br />
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