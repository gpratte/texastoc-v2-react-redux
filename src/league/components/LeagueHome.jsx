import React from "react";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {isLoggedIn} from "../../utils/util";

const LeagueHome = (props) => {

  const league = props.league;

  return (
    <div className={'main-h1'}>
      <h1>Texas TOC League</h1>
      {league.token === null || league.token.token === null ?
        <p className={'main-p'}><Link to="/login">
          <Button variant="outline-secondary"> Login </Button> </Link>
        </p>
        : ''
      }
      {
        isLoggedIn(league) &&
        <p className={'main-p'}><Link to="/league/players">
          <Button variant="outline-secondary">Players</Button> </Link>
        </p>
      }
    </div>
  )
}

export default LeagueHome;
