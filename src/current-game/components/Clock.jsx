import React from 'react'
import Button from "react-bootstrap/Button";
import {getClock, resume, pause, back, forward} from '../clockClient'

/*
 *
 */
class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {clock: null};
  }

  componentDidMount() {
    this.timer = setInterval(this.check, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  check = () => {
    getClock(this.updateClock)
  };

  updateClock = (clock) => {
    this.setState({clock: clock})
  }

  render() {
    const clock = this.state.clock;
    if (!clock) return null;

    let seconds = '' + clock.seconds;
    if (clock.seconds < 10) {
      seconds = seconds.padStart(2, '0');
    }
    return (
      <div>
        {
          clock &&
          <div>
            <span>{clock.thisRound.name}</span>
            &nbsp;&nbsp;&nbsp;
            <span>{clock.minutes}</span>:<span>{seconds}</span>
            &nbsp;&nbsp;&nbsp;
            <span>{clock.thisRound.bigBlind}</span>/
            <span>{clock.thisRound.smallBlind}</span>/
            <span>{clock.thisRound.ante}</span>
            <br/>
            {
              !clock.playing &&
              <Button variant="link"
                      onClick={() => back()}>
                <i className="fas fa-step-backward"></i>
              </Button>
            }
            {
              clock.playing &&
              <Button variant="link"
                      onClick={() => pause()}>
                <i className="fas fa-pause"></i>
              </Button>
            }
            {
              !clock.playing &&
              <Button variant="link"
                      onClick={() => resume()}>
                <i className="fas fa-play"></i>
              </Button>
            }
            {
              !clock.playing &&
              <Button variant="link"
                      onClick={() => forward()}>
                <i className="fas fa-step-forward"></i>
              </Button>
            }
            <br/>
            <span>{clock.nextRound.name}</span>
            &nbsp;&nbsp;&nbsp;
            <span>{clock.nextRound.bigBlind}</span>/
            <span>{clock.nextRound.smallBlind}</span>/
            <span>{clock.nextRound.ante}</span>
          </div>
        }
      </div>
    );
  }
}

export default Clock
