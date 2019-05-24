import React from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText,
  CardSubtitle, CardBody
} from 'reactstrap';
import Headline from './Text'


const ComponentCard = (props) => {
  return (
    <Card>
      <CardImg />
      <CardBody>
        <CardTitle>
          <Headline>
            {props.title}
          </Headline>
          </CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
};

export default ComponentCard;