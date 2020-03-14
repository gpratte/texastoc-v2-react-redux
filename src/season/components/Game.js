import React from 'react'
import moment from 'moment-timezone'
import Table from 'react-bootstrap/Table';
import Payouts from './Payouts'
import Standings from "./Standings";

class Game extends React.Component {

  render() {
    const {date, hostName, seasonGameNum, quarterlyGameNum, totalCollected, totalCombinedTocCalculated, payouts, players} = this.props.value;

    const gameDate = moment(date).tz('America/Chicago').format('MM/DD/YYYY')

    return (
      <div>
        <Table borderless={true} size="sm">
          <tbody>
          <tr>
            <td>Date</td>
            <td>{gameDate}</td>
          </tr>
          <tr>
            <td>Host</td>
            <td>{hostName}</td>
          </tr>
          <tr>
            <td>Season game</td>
            <td>{seasonGameNum}</td>
          </tr>
          <tr>
            <td>Quarterly game</td>
            <td>{quarterlyGameNum}</td>
          </tr>
          <tr>
            <td>Number of players</td>
            <td>{players ? players.length : 0}</td>
          </tr>
          <tr>
            <td>Amount collected</td>
            <td>{totalCollected}</td>
          </tr>
          <tr>
            <td>TOC amount</td>
            <td>{totalCombinedTocCalculated}</td>
          </tr>
          </tbody>
        </Table>

        <Standings value={ {players:players, hideEntries: true} }/>

        <Payouts value={payouts}/>
      </div>
    );
  }
}

export default Game

