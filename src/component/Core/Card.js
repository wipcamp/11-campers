import React from 'react';
import {
  Card,CardImg, CardTitle, CardText,
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
      </CardBody>
    </Card>
  );
};

export default ComponentCard;