import React from 'react'
import {getClock} from '../clockClient'

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
    return (
      <div>
        <h1>Clock</h1>
        {
          this.state.clock &&
          <span>{JSON.stringify(this.state.clock)}</span>
        }
      </div>
    );
  }
}

export default Clock
