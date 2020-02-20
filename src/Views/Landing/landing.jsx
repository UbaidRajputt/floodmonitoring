import React, { Component, Fragment } from "react";
import DamsMap from "../Map/damsMap";
import { Widget, addResponseMessage } from "react-chat-widget";
import firebase from '../../Components/Firebase/firebaseSetup';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUser: null,
        list: []
    };
  }

  componentDidMount() {
      this.setState({ currentUser: firebase.auth().currentUser})      
      firebase.database().ref("AdminChats/").on('value', message => {
        this.setState({
          list: message.val() ? Object.values(message.val()) : []
        });
      });
  }

  handleNewUserMessage = (newMessage) => {
    firebase.database().ref("UserChats/").push(newMessage);
  }

  componentDidUpdate(prevProps, prevState) {
      if(prevState.list !== this.state.list){
        const filtered = this.state.list.filter( m => !prevState.list.includes(m))
        filtered && filtered.map(l => {
            addResponseMessage(l);
        })
      }
  }

  render() {
    return (
      <Fragment>
        <Widget handleNewUserMessage={this.handleNewUserMessage} title="Flood Monitoring App" subtitle="Welcome" />
        <DamsMap />
      </Fragment>
    );
  }
}

export default Landing;
