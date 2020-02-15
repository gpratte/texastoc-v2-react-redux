import React from 'react'
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import QuarterlySeason from "./QuarterlySeason";

class Quarters extends React.Component {

  quarterlyName(value) {
    switch (value) {
      case 1:
        return '1st Quarter';
      case 2:
        return '2nd Quarter';
      case 3:
        return '3rd Quarter';
      default:
        return '4th Quarter';
    }
  }

  render() {
    const quarters = this.props.value;
    return quarters.map((quarter, index) => {
      return (
        <Accordion key={quarter.quarter}>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                {this.quarterlyName(quarter.quarter)}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body><QuarterlySeason value={quarter}/></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      )
    })
  }
}

export default Quarters
