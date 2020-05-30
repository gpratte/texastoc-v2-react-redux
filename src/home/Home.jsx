import React from "react";
import './Home.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {redirect, shouldRedirect} from "../utils/util";
import {CLIENT_URL} from "../utils/constants";

const Home = (props) => {
  const league = props.league;

  let redirectTo;
  if ((redirectTo = shouldRedirect(league))) {
    return redirect(redirectTo);
  }

  // Do not show anything about a game if there is not season.
  const showGame = league.season.data !== null;

  return (
    <div>
      <br/>
      <h1>Welcome to Texas TOC</h1>
      {league.token === null || league.token.token === null ?
        <p className={'main-p'}><Link to="/login">
          <Button variant="outline-secondary"> Login </Button> </Link>
        </p>
        : ''
      }
      {
        showGame &&
        <p>
          <Link to="/current-game">
            <Button variant="outline-secondary"> Game </Button>
          </Link>
        </p>
      }
      <p>
        <Link to="/season">
          <Button variant="outline-secondary">Current Season</Button>
        </Link>
        &nbsp;
        <Link to="/seasons">
          <Button variant="outline-secondary">&nbsp;Past Seasons&nbsp;</Button>
        </Link>
      </p>
      <p>
        <Link to="/league/players">
          <Button variant="outline-secondary">Players</Button>
        </Link>
        &nbsp;
        <Link to="/league/rounds">
          <Button variant="outline-secondary">Rounds</Button>
        </Link>
      </p>
      <p>
        <Button variant="outline-secondary" href={CLIENT_URL}>
          Reload
        </Button>
      </p>

    </div>
  )
}

export default Home;
