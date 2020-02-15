import React from "react";
import { Provider } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import currentGameStore from './currentGameStore'
import CurrentGameConnector from './connectors/CurrentGameConnector'

const CurrentGameContainer = () => {
  return (
    <Container>
      <Row className="justify-content-center text-center">
        <Col>
          <CurrentGameConnector/>
        </Col>
      </Row>
    </Container>
  )
}

const CurrentGameProxy = () => {
  return (
    <Provider store={currentGameStore}>
      <CurrentGameContainer />
    </Provider>
  )
}

export default CurrentGameProxy;
