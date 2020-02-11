import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import userAvatar from '../../Assets/user-avatar.png'
import firebase from '../Firebase/firebaseSetup';
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentUserUser : null
    };
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser ? firebase.auth().currentUser.displayName : "User"
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
      <header>
        <Navbar color="dark" expand="md">
          <NavbarBrand>Flood Monitoring System</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
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
                  <DropdownItem>
                    <Link onClick={() => firebase.auth().signOut()} to="/login">Logout</Link>
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
