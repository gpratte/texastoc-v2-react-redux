import React from 'react'
import './GamePlayers.css'
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

/*
 * Websocket functionality taken from https://dev.to/finallynero/using-websockets-in-react-4fkp
 */
class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ws: null,
      reconnect: true
    };
  }

  componentDidMount() {
    console.log('!!! did mount')
    if (this.state.ws != null) {
      console.log('!!! did mount closing ws')
      this.state.ws.close();
    }
    this.setState({ws: null, reconnect: true})
    this.connect();
  }

  componentWillUnmount() {
    console.log('!!! will unmount')
    if (this.state.ws != null) {
      console.log('!!! will unmoust closing ws')
      this.state.ws.close();
    }
    console.log('!!! setting state to reconnect false')
    this.setState({ws: null, reconnect: false})
  }

  timeout = 250; // Initial timeout duration as a class variable

  /**
   * @function connect
   * This function establishes the connect with the websocket and also ensures
   * constant reconnection if connection closes
   */
  connect = () => {

    const socket = new SockJS('http://localhost:8080/socket');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/greetings', function (data) {
        console.log('!!! received ' + data)
      });
    });
  };

  /**
   * utilited by the @function connect to check if the connection is close,
   * if so attempts to reconnect
   */
  check = () => {
    const { ws } = this.state;
    //check if websocket instance is closed, if so call `connect` function.
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect();
  };


  render() {
    console.log('!!! render ' + JSON.stringify(this.state))
    return (
      <div>
        <h1>Clock</h1>
      </div>
    );
  }
}

export default Clock
