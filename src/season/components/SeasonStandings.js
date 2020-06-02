import React from 'react'
import Table from 'react-bootstrap/Table';

class Standings extends React.Component {

  renderStandings(players) {
    if (players) {
      return players.map((player, index) => {
        const {id, place, name, points, entries} = player
        if (index === 2 || index === 10 || index === 20) {
          return (
            <>
              <tr key={id + 'x'}>
                <td>--</td>
                <td>-------</td>
                <td>----</td>
                <td>--</td>
              </tr>
              <tr key={id}>
                <td>{place ? place : ''}</td>
                <td>{name}</td>
                <td>{points ? points : ''}</td>
                <td>{entries}</td>
              </tr>
            </>
          )
        }
        return (
          <tr key={id}>
            <td>{place ? place : ''}</td>
            <td>{name}</td>
            <td>{points ? points : ''}</td>
            <td>{entries}</td>
          </tr>
        )
      })
    }
  }

  render() {
    const {players} = this.props.value;

    return (
      <Table striped bordered size="sm">
        <thead>
        <tr>
          <th><i className="fas fa-clipboard-list"/></th>
          <th>Name</th>
          <th>Points</th>
          <th>Entries</th>
        </tr>
        </thead>
        <tbody>
        {this.renderStandings(players)}
        </tbody>
      </Table>
    );
  }
}

export default Standings
