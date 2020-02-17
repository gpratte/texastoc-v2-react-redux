import React from "react";
import { Provider } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import seasonStore from './seasonStore'
import SeasonConnector from './connectors/SeasonConnector'

const SeasonContainer = () => {
  return (
    <Container>
      <Row className="justify-content-center text-center">
        <Col>
          <SeasonConnector/>
        </Col>
      </Row>
    </Container>
  )
}

class SeasonProxy extends React.Component {

  componentDidMount() {
    // TODO get the season from the server
    console.log('!!! SeasonProxy did mount')
  }

  render() {
    return (
      <Provider store={seasonStore}>
        <SeasonContainer />
      </Provider>
    );
  }
}

export default SeasonProxy;
