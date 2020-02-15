import React from "react";
import './Home.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <div className={'main-h1'}>
      <h1>Welcome to Texas TOC</h1>
      <p className={'main-p'}><Link to="/season">
        <Button variant="outline-secondary"> View the latest season </Button> </Link>
      </p>
      <p className={'main-p'}><Link to="/current-game">
        <Button variant="outline-secondary"> Go to the current game </Button> </Link>
      </p>
    </div>
  )
}

export default Home;
