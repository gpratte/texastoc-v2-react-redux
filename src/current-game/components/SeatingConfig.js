import React from 'react'
import './GamePlayers.css'
import leagueStore from '../../league/leagueStore'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SeatingPlayerAtTable from './SeatingPlayerAtTable'
import SeatingSeatsPerTable from './SeatingSeatsPerTable'
import {
  TOGGLE_CONFIGURE_SEATING,
  SUBMIT_SEATING
} from '../actions/gameActions'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import _ from 'lodash';

const fiveTables = [1, 2, 3, 4, 5]

class SeatingConfig extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gamePlayers: props.game.gamePlayers,
      seating: Object.assign({}, props.game.seating,
        {numSeatsPerTable: [...props.game.seating.numSeatsPerTable]},
        {tableRequests: [...props.game.seating.tableRequests]})
    };
    this.handleChangeSeatsPerTables = this.handleChangeSeatsPerTables.bind(this);
    this.handleAddAnotherRequest = this.handleAddAnotherRequest.bind(this);
    this.handlePlayerRequesting = this.handlePlayerRequesting.bind(this);
    this.handleTableRequesting = this.handleTableRequesting.bind(this);
  }


  renderNumberOfTables() {
    return fiveTables.map((num) => {
      return (
        <option key={num} value={num}>{num}</option>
      )
    })
  }

  handleChangeNumTables(e) {
    const newNumSeatsPerTable = [...this.state.seating.numSeatsPerTable];

    const newNumTables = parseInt('' + e.target.value);
    let delta = newNumTables - this.state.seating.numTables;
    let deltaPositive = true;
    if (delta < 0) {
      deltaPositive = false;
      delta = Math.abs(delta);
    }
    for (let i = 0; i < delta; ++i) {
      if (deltaPositive) {
        newNumSeatsPerTable.push(10);
      } else {
        newNumSeatsPerTable.pop();
      }
    }
    const newSeating = (Object.assign({}, this.state.seating,
      {numTables: newNumTables},
      {numSeatsPerTable: newNumSeatsPerTable}))
    this.setState({seating: newSeating})
  }

  handleChangeSeatsPerTables(e, tableNum) {
    const numSeats = parseInt('' + e.target.value);
    const newNumSeatsPerTable = [...this.state.seating.numSeatsPerTable];
    newNumSeatsPerTable[tableNum] = numSeats;
    const newSeating = (Object.assign({}, this.state.seating,
      {numSeatsPerTable: newNumSeatsPerTable}))
    this.setState({seating: newSeating})
  }

  handleAddAnotherRequest() {
    const tableRequests = [...this.state.seating.tableRequests];
    tableRequests.push({playerId: null, tableNum: 1});
    const newSeating = (Object.assign({}, this.state.seating,
      {tableRequests: tableRequests}))
    this.setState({seating: newSeating})
  }

  handlePlayerRequesting(e, requestNum) {
    const tableRequests = [...this.state.seating.tableRequests];
    tableRequests[requestNum].playerId = parseInt('' + e.target.value);
    const newSeating = (Object.assign({}, this.state.seating,
      {tableRequests: tableRequests}))
    this.setState({seating: newSeating})
  }

  handleTableRequesting(e, requestNum) {
    const tableRequests = [...this.state.seating.tableRequests];
    tableRequests[requestNum].tableNum = parseInt('' + e.target.value);
    const newSeating = (Object.assign({}, this.state.seating,
      {tableRequests: tableRequests}))
    this.setState({seating: newSeating})
  }

  requestSeating = (e) => {
    e.preventDefault();
    const seatingConfig = {numTables: this.state.seating.numSeatsPerTable.length};
    seatingConfig['numSeatsPerTable'] = [...this.state.seating.numSeatsPerTable];

    seatingConfig['tableRequests'] = []
    _.forEach(this.state.seating.tableRequests, function(tableRequest) {
      if (tableRequest.playerId) {
        seatingConfig.tableRequests.push(tableRequest);
      }
    })

    leagueStore.dispatch({type: SUBMIT_SEATING, seatingConfig})
  }

  render() {
    return (
      <div>
        <Modal show={this.props.game.showConfigureSeating}
               onHide={() => leagueStore.dispatch({type: TOGGLE_CONFIGURE_SEATING, show: false})}>
          <Modal.Body>
            <Form onSubmit={this.requestSeating}>
              <Form.Group as={Row} className="align-items-center">
                <Form.Label>&nbsp;&nbsp;Number of Tables</Form.Label>
                <Col>
                  <Form.Control as="select"
                                defaultValue={this.state.seating.numTables}
                                id="tablesId"
                                onChange={(e) => this.handleChangeNumTables(e)}>
                    {this.renderNumberOfTables()}
                  </Form.Control>
                </Col>
              </Form.Group>

              <SeatingSeatsPerTable seating={this.state.seating}
                                    handleChangeSeatsPerTables={this.handleChangeSeatsPerTables}/>

              <SeatingPlayerAtTable gamePlayers={this.state.gamePlayers}
                                    seating={this.state.seating}
                                    handleAddAnotherRequest={this.handleAddAnotherRequest}
                                    handlePlayerRequesting={this.handlePlayerRequesting}
                                    handleTableRequesting={this.handleTableRequesting}/>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                  leagueStore.dispatch({type: TOGGLE_CONFIGURE_SEATING, show: false})
                }}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Seat The Players
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default SeatingConfig
