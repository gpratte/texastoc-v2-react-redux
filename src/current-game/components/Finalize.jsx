import React from 'react'
import Button from "react-bootstrap/Button";
import {gameOver} from "../gameUtils";
import {finalize} from "../gameClient";

class Finalize extends React.Component {

  render() {
    const {gamePlayers, gameId, finalized} = this.props;
    const isGameOver = gameOver(gamePlayers);
    if (!isGameOver) {
      return null;
    }

    if (finalized) {
      return (
        <Button variant="primary" onClick={() => alert('finalize')}>
          Edit Game
        </Button>
      );
    }

    return (
      <Button variant="primary" onClick={() => finalize(gameId)}>
        Game Over
      </Button>
    );
  }
}

export default Finalize
