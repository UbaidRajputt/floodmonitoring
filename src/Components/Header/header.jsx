import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import userAvatar from '../../Assets/user-avatar.png'
import firebase from '../Firebase/firebaseSetup';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUserUser : null
    };
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser.displayName
    if(currentUser){
        this.setState({ currentUser })
    }
  }

  toggle = () => {
      this.setState({ isOpen: !this.state.isOpen })
  }
  render() {
      const { isOpen, currentUser } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>Flood Monitoring System</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="alignAvatar">
            <UncontrolledDropdown className="fright">
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
                  <DropdownItem onClick={() => firebase.auth().signOut()}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
