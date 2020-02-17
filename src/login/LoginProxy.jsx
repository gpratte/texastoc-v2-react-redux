import React from "react";
import { Provider } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import loginStore from './loginStore'
import LoginConnector from './connectors/LoginConnector'

const LoginContainer = () => {
  return (
    <Container>
      <Row className="justify-content-center text-center">
        <Col>
          <LoginConnector/>
        </Col>
      </Row>
    </Container>
  )
}

const LoginProxy = () => {
  return (
    <Provider store={loginStore}>
      <LoginContainer />
    </Provider>
  )
}

export default LoginProxy;
