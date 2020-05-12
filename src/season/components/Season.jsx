import React from 'react'
import './Season.css'
import moment from 'moment-timezone'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import SeasonDetails from './SeasonDetails'
import Standings from './Standings'
import Quarters from './Quarters'
import Games from './Games'
import {Link} from "react-router-dom";
import leagueStore from "../../league/leagueStore";
import {GETTING_SEASON} from "../seasonActions";
import {getCurrentSeason} from "../seasonClient";
import {redirect, shouldRedirect} from "../../utils/util";
import NewVersion from "../../league/components/NewVersion";

class Season extends React.Component {

  shouldInitialize = (league) => {
    const shouldInitialize = league.token !== null &&
      league.token.token !== null &&
      league.season.data === null &&
      league.season.gettingSeason === false &&
      league.season.seasonNotFound === false;
    if (shouldInitialize) {
      leagueStore.dispatch({type: GETTING_SEASON, flag: true})
      getCurrentSeason(league.token.token);
    }
  }

  componentDidMount() {
    this.shouldInitialize(this.props.league);
  }

  componentDidUpdate() {
    this.shouldInitialize(this.props.league);
  }


  render() {
    const league = this.props.league;
    if (league.newVersion) {
      return <NewVersion/>
    }

    let redirectTo;
    if ((redirectTo = shouldRedirect(league))) {
      return redirect(redirectTo);
    }

    if (league.season.seasonNotFound === true) {
      return (
        <div>
          <br/>
          <h1>Missing Current Season</h1>
          <br/>
          <p><Link to="/season/new">
            <Button variant="outline-secondary"> Create a new season </Button> </Link>
          </p>
        </div>
      );
    }

    if (league.season.data == null) {
      return (
        <div>
          <br/>
          <h2>Initializing...</h2>
          <br/>
        </div>
      );
    }

    const season = league.season.data;
    const startDate = moment(season.start).tz('America/Chicago').format('YYYY')
    const endDate = moment(season.end).tz('America/Chicago').format('YYYY')

    return (
      <div>
        <h3>{'' + startDate + ' - '  + endDate}</h3>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Details
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body><SeasonDetails value={season}/></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <Standings value={ {players: season.players} }/>

        <Tabs className="style1" defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab className="style2" eventKey="quarters" title="&nbsp;&nbsp;&nbsp;Quarters&nbsp;&nbsp;&nbsp;">
            <Quarters value={season.quarterlySeasons}/>
          </Tab>
          <Tab className="style2" eventKey="games" title="&nbsp;&nbsp;&nbsp;Games&nbsp;&nbsp;&nbsp;">
            <Games value={season.games}/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Season
