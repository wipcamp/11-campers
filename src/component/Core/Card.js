import React from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText,
  CardSubtitle, CardBody
} from 'reactstrap';
import Headline, { Subtitle } from './Text'


const ComponentCard = (props) => {
  return (
    <Card className="p-3">
      <CardImg />
      <CardBody>
        <CardTitle>
          <Headline className="text-center">
            {props.title}
          </Headline>
        </CardTitle>
        <CardSubtitle>
          <Subtitle className="text-center">
            {props.subtitle}
          </Subtitle>
        </CardSubtitle>
        <CardText >
          {props.text}
        </CardText>
        <div className={props.position}>
          <Button>{props.textBtn}</Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ComponentCard;