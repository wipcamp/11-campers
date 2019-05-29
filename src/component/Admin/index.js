import React, { Component } from 'react';
import CookiesService from 'js-cookie';
import AuthService from '../../service/AuthService'
import { Redirect } from 'react-router'
import Swl from 'sweetalert2'
import Bg from '../Core/Background'
import socketIOClient from 'socket.io-client'
import Card from '../Core/Card'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import service from '../../service/serviceprofile';
import ProfileService from '../../service/serviceprofile'
import styled from 'styled-components'

const socket = socketIOClient(process.env.REACT_APP_PATH_SOCKET)

const Img = styled.img`
  width : 100%;
  margin-bottom:5%;
`

class index extends Component {

  state = {
    redirect: false,
    id: null,
    photo: null,
    showBtn: 'hidden',
    showID: false,
    height: '',
    nameTH: '',
    nameEN: '',
    lastname_en: '',
    lastname_th: '',
    flavor: '',
    room: '',
    editdata : true,
  }

  componentDidMount() {
    this.checkCookie()
  }

  checkRole = async () => {
    let role = await AuthService.getRole()
    try {
      if (role !== 10) {
        Swl.fire(
          'คุณไม่ได้รับสิทธิ์ให้ใช้งาน'
        )
        this.setState({
          redirect: true
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  checkCookie = async () => {
    try {
      if (CookiesService.get('JWT') != null) {
        this.setState({
          redirect: false
        })
      } else {
        this.setState({
          redirect: true
        })
      }
    } catch (e) {
    }
  }

  getPerson = async (e) => {
    socket.on('personClient', async (res) => {
      let response = await service.getProfile(res.id)
      this.setFlavor(response.data.camper.flavor_id)
      const imgStr = String.fromCharCode.apply(null, new Uint8Array(res.photo));
      try {
        this.setState({
          id: res.id,
          nameTH: response.data.profile.firstname_th,
          lastname_th: response.data.profile.lastname_th,
          nameEN: response.data.profile.firstname_en,
          lastname_en: response.data.profile.lastname_en,
          photo: imgStr,
          wipId: response.data.profile.wip_id,
          room : response.data.camper.bed_room
        })
      } catch (error) {
        return  
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


  handleData = async () => {
    this.setState({ editdata: true })
    const { nameEN, nameTH, id, lastname_en, lastname_th } = this.state
    await ProfileService.editProfileByAdmin({
      id: id,
      nameTH: nameTH,
      lastname_th: lastname_th,
      nameEN: nameEN,
      lastname_en: lastname_en
    }).then(()=>{
      Swl.fire({
        type: 'success',
        title: 'สำเร็จ',
        text: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
      })
    }).catch(() =>{
      Swl.fire({
        title: '<strong>คำเตือน !</strong>',
        type: 'warning',
        html:
          'ขออภัยเกิดข้อผิดพลาด' +
          'กรุณาติดต่อผู้ดูแลระบบ',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false
      }).then(()=>{
        window.location.reload();
      })
    })
  }


  render() {
    if (this.state.redirect) {
      Swl.fire(
        'Session หมดอายุ',
        'กรุณา Login ใหม่'
      )
      return <Redirect push to="/login" />
    }
    this.getPerson()
    return (
      <Bg height="100vh">
        <Container>
          <Row>
            <Col sm="12" md={{ size: 10, offset: 1 }} className="p-5" style={{ zIndex: 10 }}>
              <Card
                title="Wip Camp #11"
                text={
                  <Row>
                    <Col className="text-center" md={{ size: 3 }}>
                      <Img src='/img/insteadcitizenpic.jpg' />
                      <Button onClick={() => this.setState({ editdata: false })}
                        disabled={this.state.editdata ? false : true}>
                        แก้ไขข้อมูล
                        </Button>
                      <Button onClick={() => this.handleData()}
                        disabled={this.state.editdata ? true : false}>
                        บันทึกข้อมูล
                      </Button>
                    </Col>
                    <Col md={{ size: 9 }}>
                      ข้อมูลส่วนตัว (กรุณาตรวจสอบข้อมูล)<br />
                      เลขบัตรประจำตัว : {this.state.id}<br />
                      ชื่อ-นามสกุล (ไทย) :
                      <Input defaultValue={this.state.nameTH}
                        onChange={(e) => this.setState({ nameTH: e.target.value })}
                        disabled={this.state.editdata} />
                      <Input defaultValue={this.state.lastname_th}
                        onChange={(e) => this.setState({ lastname_th: e.target.value })}
                        disabled={this.state.editdata} />
                      ชื่อ-นามสกุล (อังกฤษ) :
                      <Input defaultValue={this.state.nameEN}
                        onChange={(e) => this.setState({ nameEN: e.target.value })}
                        disabled={this.state.editdata} />
                      <Input defaultValue={this.state.lastname_en}
                        onChange={(e) => this.setState({ lastname_en: e.target.value })}
                        disabled={this.state.editdata} />
                      <br />
                      ข้อมูลค่าย <br />
                      สี :  {this.state.flavor}<br />
                      ห้องพัก : {this.state.room}<br />
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
        </Container>
      </Bg>
    );
  }
}

export default index;