import React from 'react'
import {flatMap, map} from 'lodash';
import Table from 'react-bootstrap/Table';
import SeatingConfig from "./SeatingConfig";
import Button from "react-bootstrap/Button";
import leagueStore from '../../league/leagueStore'
import {TOGGLE_CONFIGURE_SEATING} from "../actions/gameActions";

class Seating extends React.Component {

  renderTables(tables) {
    const seats = flatMap(tables, ({seats}) =>
      map(seats, seat => ({...seat}))
    );
    return seats.map((seat, index) => {
      const {seatNumber, tableNumber, gamePlayerName} = seat;
      return (
        <tr key={index}>
          <td>{tableNumber}</td>
          <td>{seatNumber}</td>
          <td>{gamePlayerName}</td>
        </tr>
      )
    })
  }

  render() {
    const game = this.props.value;
    const {tables} = game;
    return (
      <div>
        <Table striped bordered size="sm">
          <thead>
          <tr>
            <th>Table</th>
            <th>Seat</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          {this.renderTables(tables)}
          </tbody>
        </Table>
        <Button variant="outline-secondary"
                onClick={() => leagueStore.dispatch({type: TOGGLE_CONFIGURE_SEATING, show: true})}>
          Configure Seating
        </Button>
        {/*TODO ask about key to remount the react component*/}
        <SeatingConfig key={game.showConfigureSeatingKey} game={game}/>
      </div>
    );
  }
}

export default Seating
