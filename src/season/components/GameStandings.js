import React from 'react'
import Table from 'react-bootstrap/Table';

class GameStandings extends React.Component {

  renderStandings(players) {
    if (players) {
      return players.map((player, index) => {
        const {
          id, name, buyInCollected, rebuyAddOnCollected, annualTocCollected,
          quarterlyTocCollected, chop, points, place
        } = player;
        return (
          <tr key={id}>
            <td>{place}</td>
            <td>{name}</td>
            <td>{buyInCollected ? String.fromCharCode(10004) : ''}</td>
            <td>{rebuyAddOnCollected ? String.fromCharCode(10004) : ''}</td>
            <td>{annualTocCollected ? String.fromCharCode(10004) : ''}</td>
            <td>{quarterlyTocCollected ? String.fromCharCode(10004) : ''}</td>
            <td>{chop ? chop : ''}</td>
            <td>{points ? points : ''}</td>
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
          <th>Fin</th>
          <th>Name</th>
          <th>Buy<br/>In</th>
          <th>Re<br/>Buy</th>
          <th>TOC</th>
          <th>QTOC</th>
          <th>Chp</th>
          <th>Pts</th>
        </tr>
        </thead>
        <tbody>
        {this.renderStandings(players)}
        </tbody>
      </Table>
    );
  }
}

export default GameStandings
