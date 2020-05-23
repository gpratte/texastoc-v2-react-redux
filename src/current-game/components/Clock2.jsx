import React from 'react'
import './GamePlayers.css'
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {SERVER_URL} from '../../utils/constants';

/*
 * Websocket functionality taken from https://dev.to/finallynero/using-websockets-in-react-4fkp
 */
class Clock2 extends React.Component {
  constructor(props) {
    super(props);
    // had to connect in the constructor because doing it in the
    // did mount had a race condition with the will unmount and
    // in that case the socket would never get closed
    const socket = this.connect();
    this.state = {
      time: null,
      ws: socket
    };
  }

  componentWillUnmount() {
    if (this.state.ws != null) {
      this.state.ws.close();
    }
  }

  /**
   * @function connect
   * This function establishes the connect with the websocket and also ensures
   * constant reconnection if connection closes
   */
  connect = () => {
    let socket = null;
    try {
      socket = new SockJS(SERVER_URL + '/socket');
      const stompClient = Stomp.over(socket);
      const that = this;
      stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/greetings', data => {
          that.setState({time: data.body});
        });
      });

      // Take over the function that prints debug messages
      stompClient.debug = function (str) {
        // do nothing
      };
    } finally {
      return socket;
    }
  };

  render() {
    return (
      <div>
        <h1>Clock</h1>
        <p>{this.state.time}</p>
      </div>
    );
  }
}

export default Clock2
