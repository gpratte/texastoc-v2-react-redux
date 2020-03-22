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
      <Button variant="primary" onClick={() => finalize(gameId)}>
        Game Over
      </Button>
    );
  }
}

export default Finalize
