import React from 'react';
import { Col,Row } from 'reactstrap';
import styled from 'styled-components'

const FlavorColor = styled.div`
  background-color: ${props => props.color};
  height:5vh;
  width:5vh;
  margin:0;
`

const Content = (props) =>{
  return (
    <React.Fragment>
      <Col md={{ size: 9 }}>
        ข้อมูลส่วนตัว (กรุณาตรวจสอบข้อมูล)<br />
        เลขบัตรประจำตัว : {props.citizen}<br />
        ชื่อ-นามสกุล (ไทย) :  {props.nameTH} {props.lastnameTH}<br />
        ชื่อ-นามสกุล (อังกฤษ) : {props.nameEN} {props.lastnameEN}<br />
        <br />
        ข้อมูลค่าย <br />
        <Row>
        <Col>
        สี : {props.flavor} <FlavorColor color={props.flavorColor}/>
        </Col>
        <Col>
        ห้องพัก : {props.room}<br />
        </Col>
        </Row>
      </Col>
    </React.Fragment>
   )
  }

export default Content;