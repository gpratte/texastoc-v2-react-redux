import React from "react";
import './Home.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import {isLoggedIn} from "../utils/util";
import {refresh, isRefreshing} from '../league/leagueClient'
const Home = (props) => {

  const league = props.league;

  // Do not show anything about a game if there is not season.
  const showGame = league.season.data !== null;

  return (
    <div className={'main-h1'}>
      <h1>Welcome to Texas TOC</h1>
      {league.token === null || league.token.token === null ?
        <p className={'main-p'}><Link to="/login">
          <Button variant="outline-secondary"> Login </Button> </Link>
        </p>
        : ''
      }
      {
        isLoggedIn(league) &&
        <p className={'main-p'}><Link to="/season">
          <Button variant="outline-secondary"> View the latest season </Button> </Link>
        </p>
      }
      {
        isLoggedIn(league) && showGame &&
        <p className={'main-p'}><Link to="/current-game">
          <Button variant="outline-secondary"> Go to the current game </Button> </Link>
        </p>
      }
      {
        isLoggedIn(league) && !isRefreshing(league) &&
        <p className={'main-p'}>
          <Button variant="outline-secondary" onClick={() => refresh()}>
          Refresh
          </Button>
        </p>
      }
      {
        isLoggedIn(league) && isRefreshing(league) &&
        <p className={'main-p'}>
          <Button variant="outline-secondary">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
            {'  '}Refresh
          </Button>
        </p>
      }
    </div>
  )
}

export default Home;
