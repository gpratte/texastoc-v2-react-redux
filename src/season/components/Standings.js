import React from 'react'
import Table from 'react-bootstrap/Table';

class Standings extends React.Component {

  renderStandings(players, hideEntries) {
    return players.map((player, index) => {
      const {id, place, name, points, entries} = player
      return (
        <tr key={id}>
          <td>{place}</td>
          <td>{name}</td>
          <td>{points}</td>
          { hideEntries ? <td></td> : <td>{entries}</td>}
        </tr>
      )
    })
  }

  render() {
    const {players, hideEntries} = this.props.value;

    return (
      <Table striped bordered size="sm">
        <thead>
        <tr>
          <th>Place</th>
          <th>Name</th>
          <th>Points</th>
          { hideEntries ? <th></th> : <th>Entries</th> }
        </tr>
        </thead>
        <tbody>
        {this.renderStandings(players, hideEntries)}
        </tbody>
      </Table>
    );
  }
}

export default Standings
