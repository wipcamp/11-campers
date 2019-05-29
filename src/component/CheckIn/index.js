import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import { Container, Row, Col, Button, Input } from 'reactstrap';
import Card from '../Core/Card';
import Bg from '../Core/Background'
import RuleText from '../Core/RuleWiFiText'
import service from '../../service/serviceprofile';
import CamperService from '../../service/servicecampers'
import Swal from 'sweetalert2'
import Btn from '../Core/Button'
import Content from './Content'

const socket = socketIOClient(process.env.REACT_APP_PATH_SOCKET)

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
    flavorColor: '',
    room: '',
    wipId: null,
    reload: false,
    lastnameTH: '',
    lastnameEN: '',
  }

  handleCheck = (e) => {
    if (e.target.checked) {
      this.setState({ showBtn: 'inherit', showConfirm: 'hidden' })
    } else {
      this.setState({ showBtn: 'hidden' })
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
      try {
        this.setFlavor(response.data.camper.flavor_id)
        const imgStr = String.fromCharCode.apply(null, new Uint8Array(res.photo));
        this.setState({
          id: res.id,
          nameTH: response.data.profile.firstname_th,
          lastnameTH: response.data.profile.lastname_th,
          nameEN: response.data.profile.firstname_en,
          lastnameEN: response.data.profile.lastname_en,
          photo: `data:image/jpeg;base64,${btoa(imgStr)}`,
          room: response.data.camper.bed_room,
          wipId: response.data.profile.wip_id
        })
      } catch (error) {
        Swal.fire({
          title: '<strong>คำเตือน !</strong>',
          type: 'warning',
          html:
            'ขออภัยเกิดข้อผิดพลาด<br/>' +
            'คุณอาจไม่มีข้อมูลในระบบ<br/>' +
            'กรุณาติดต่อผู้ดูแลระบบ<br/><br/>',
          showCloseButton: true,
          showCancelButton: false,
          showConfirmButton: false
        }).then(() => {
          window.location.reload();
        })
      }
    })
  }

  setFlavor = (id) => {
    switch (id) {
      case 1: this.setState({ flavor: 'สีดำ', flavorColor: '#000' })
        break;
      case 2: this.setState({ flavor: 'สีส้ม', flavorColor: '#F9671E' })
        break;
      case 3: this.setState({ flavor: 'สีแดง', flavorColor: '#F41822' })
        break;
      case 4: this.setState({ flavor: 'สีฟ้า', flavorColor: '#0093D6' })
        break;
      case 5: this.setState({ flavor: 'สีเขียว', flavorColor: '#7CC540' })
        break;
      case 6: this.setState({ flavor: 'สีน้ำตาล', flavorColor: '#6E4120' })
        break;
      case 7: this.setState({ flavor: 'สีเหลือง', flavorColor: '#FFF800' })
        break;
      case 8: this.setState({ flavor: 'สีม่วง', flavorColor: '#902390' })
        break;
      case 9: this.setState({ flavor: 'สีชมพู', flavorColor: '#F66B96' })
        break;
      case 10: this.setState({ flavor: 'สีเขียวแก่', flavorColor: '#2F5D2A' })
        break;
      case null: this.setState({ flavor: 'ไม่มีสี', flavorColor: '#fff' })
        break;
      default:
        break;
    }
  }

  handleData = async (e) => {
    const { id, wifi, wipId } = this.state
    await CamperService.checkInCamper({
      checkIn: "checked",
      citizen: id,
      wifi: wifi,
      wipId: wipId
    }).then(() => {
      Swal.fire({
        type: 'success',
        title: 'สำเร็จ',
        text: 'ยืนยันข้อมูลเรียบร้อยแล้ว',
      }).then(() => {
        // window.location.reload();
      })
    }).catch(() => {
      Swal.fire({
        title: '<strong>คำเตือน !</strong>',
        type: 'warning',
        html:
          'ขออภัยเกิดข้อผิดพลาด<br/>' +
          'คุณอาจไม่มีข้อมูลในระบบ<br/>' +
          'กรุณาติดต่อผู้ดูแลระบบ<br/><br/>',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false
      }).then(() => {
        window.location.reload();
      })
    })
  }

  render() {
    this.getPerson()
    const { height, showID,
      photo, id, img,
      nameTH, nameEN, lastnameTH,
      lastnameEN, flavor, room,
      subtitle, showBtn, showConfirm,
      flavorColor
    } = this.state
    return (
      <React.Fragment>
        <Bg height={height}>
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }} 
              className="p-5" style={{ zIndex: 10 }}>
                <Card
                  title="Wip Camp #11"
                  text={showID ?
                    <Row>
                      <Content
                        sourcImg={img}
                        imgOver={photo}
                        citizen={id}
                        nameTH={nameTH}
                        lastnameTH={lastnameTH}
                        nameEN={nameEN}
                        lastnameEN={lastnameEN}
                        flavor={flavor}
                        flavorColor={flavorColor}
                        room={room}
                      />
                    </Row>
                    : <RuleText />}
                  subtitle={subtitle}
                  position="row justify-content-end" >
                </Card>
                <div className="text-center" >
                  <Input type="checkbox" required
                    onClick={(e) => this.handleCheck(e)} />ยอมรับเงื่อนไข
                 </div>
                <Btn className="text-right" show={showBtn}>
                  <Button onClick={(e) => this.showID(e)}>ดำเนินการต่อ</Button>
                </Btn>
                <Btn className="text-right" show={showConfirm}>
                  <Button onClick={(e) => this.handleData(e)}>ยืนยันข้อมูล</Button>
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