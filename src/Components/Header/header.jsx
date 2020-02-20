import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Nav, NavItem, Badge
} from "reactstrap";
import userAvatar from '../../Assets/user-avatar.png'
import firebase from '../Firebase/firebaseSetup';
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUserUser : null,
        newMessage: false,
        messageNotif: []
    };
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser ? firebase.auth().currentUser.displayName : "User"
    if(currentUser){
        this.setState({ currentUser })
    }
    firebase.database().ref("Chats/").child(currentUser).child("Admin").on('value', message => {
      this.setState({
        newMessage: message.val() ? true : false
      });
    });
    if(currentUser==="Admin"){
      firebase.database().ref("Messages/").on('value', message => {
        this.setState({
          messageNotif: message.val() ? Object.values(message.val()) : []
        });
      });
    }
  }

  toggle = () => {
      this.setState({ isOpen: !this.state.isOpen })
  }

  /* clearMessage = () => {
      this.setState({ newMessage: false })
  } */

  render() {
      const { isOpen, currentUser, newMessage, messageNotif } = this.state;
    return (
      <header>
        <Navbar color="dark" expand="md">
          <Link className='navbar-brand' to='/home'>Flood Monitoring System</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/weather">Weather</Link>
            </NavItem>
            { currentUser!=="Admin" ?
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret onClick={this.clearMessage}>
                Notifications  {  newMessage ? <Badge>1</Badge> : <Badge>0</Badge>}
              </DropdownToggle>
              { newMessage ?
              <DropdownMenu right>
                  <DropdownItem>
                  Admin sent a new message
                  </DropdownItem>
              </DropdownMenu>
              : 
              <DropdownMenu right>
              <DropdownItem>
              No new message
              </DropdownItem>
          </DropdownMenu> }
            </UncontrolledDropdown>
            :
            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret onClick={this.clearMessage}>
              Notifications  {  messageNotif && messageNotif.length>0 ? <Badge>{messageNotif.length}</Badge> : <Badge>0</Badge>}
            </DropdownToggle>
            <DropdownMenu right>
            { messageNotif && messageNotif.length>0 ?
            messageNotif.map( m => (
                <DropdownItem>
                 {m}
                </DropdownItem>
            ))
            
            : 
                <DropdownItem>
               No Messages  Received
                </DropdownItem>
            }
            </DropdownMenu>
          </UncontrolledDropdown>
          }
            </Nav>
            <UncontrolledDropdown className='profile-dropdown'>
                <DropdownToggle nav>
                  <img className="avatar" src={userAvatar}  alt="userAvatar"/>
                </DropdownToggle>
                <DropdownMenu right>
                  <div className="username">
                    {
                      currentUser ? currentUser : "User"
                    }
                  </div>
                  <DropdownItem divider />
                  {currentUser !== 'Admin' &&
                    <Fragment>
                      <DropdownItem>
                        <Link to={`/edit/${currentUser}`}>Edit Profile</Link>
                      </DropdownItem>
                      <DropdownItem divider />
                    </Fragment>
                  }
                  <DropdownItem>
                    <Link onClick={() => { firebase.auth().signOut(); firebase.database().ref("Chats/").child(currentUser).remove(); }} to="/login">Logout</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
