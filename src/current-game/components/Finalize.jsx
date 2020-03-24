import React from 'react'
import Button from "react-bootstrap/Button";
import {finalize, unfinalize} from "../gameClient";

class Finalize extends React.Component {

  render() {
    const {isGameOver, gameId, finalized} = this.props;

    if (finalized) {
      return (
        <Button variant="primary" onClick={() => unfinalize(gameId)}>
          Edit Game
        </Button>
      );
    }

    if (!isGameOver) {
      return null;
    }

    return (
      <div>
        <h3>If the game is over then click the Finalize button</h3>
        <Button variant="primary" onClick={() => finalize(gameId)}>
          Finalize
        </Button>
      </div>
    );
  }
}

export default Finalize
