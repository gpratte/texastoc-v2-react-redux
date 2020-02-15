import React from 'react'
import moment from 'moment-timezone'
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Game from "./Game";

class Games extends React.Component {

  render() {
    const games = this.props.value;
    return games.map((game, index) => {
      return (
        <Accordion key={game.id}>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                {moment(game.date).tz('America/Chicago').format('MM/DD/YYYY')}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body><Game value={game}/></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      )
    })
  }
}

export default Games
