import React from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components'

const FlavorColor = styled.div`
  background-color: ${props => props.color};
  height:5vh;
  width:5vh;
  margin:0;
`

const Img = styled.img`
  width: 100%;
  margin-bottom:5%;
`

class Content extends React.Component{
  state = {
    over : false
  }
  render () {
    const {over} = this.state
    const {sourcImg,imgOver,
      citizen,nameTH,lastnameTH,
      nameEN,lastnameEN,flavor,
      flavorColor,room
    } = this.props
    return (
      <React.Fragment>
      <Col md={{ size: 3 }}>
        <Img src={over ? imgOver : sourcImg}
          onMouseOver={() => this.setState({ over: true })} />
      </Col>
      <Col md={{ size: 9 }}>
        ข้อมูลส่วนตัว (กรุณาตรวจสอบข้อมูล)<br />
        เลขบัตรประจำตัว : {citizen}<br />
        ชื่อ-นามสกุล (ไทย) :  {nameTH} {lastnameTH}<br />
        ชื่อ-นามสกุล (อังกฤษ) : {nameEN} {lastnameEN}<br />
        <br />
        ข้อมูลค่าย <br />
        <Row>
          <Col>
            สี : {flavor} <FlavorColor color={flavorColor} />
          </Col>
          <Col>
            ห้องพัก : {room}<br />
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  )
}
}

export default Content;