import React, { Component } from "react";
import firebase from "../../Components/Firebase/firebaseSetup";
import classnames from 'classnames';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import SmsAlerts from "./SmsAlerts";
import ManageUsers from "./ManageUsers";
import Landing from '../Landing/landing';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeTab: "1",
        usersList: []
    };
  }

  toggle = (tab) => {
      if(this.state.activeTab !== tab){
        this.setState({ activeTab: tab })
      }
  }

  getAllUsers = () => {
    let th = this;
    firebase
      .database()
      .ref("UserDetails/")
      .once("value", function(snapshot) {
        let users = snapshot.val() ? Object.values(snapshot.val()) : []
        users = [...new Map(users.map(item => [item["name"], item])).values()];
        th.setState({ usersList: users}, () => console.log(th.state.usersList));
      });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <article>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Send Alerts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Manage Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              See Maps
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className='theme-container'>
              <Row>
                <Col sm="1" lg="1" />
                <Col sm="10" lg="10">
                  <SmsAlerts usersList={this.state.usersList} firebase={firebase}/>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className='theme-container'>
              <Row>
                <Col sm="1" lg="1" />
                <Col sm="10" lg="10">
                <ManageUsers getAllUsers={this.getAllUsers} firebase={firebase} />
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="3">
            {
              activeTab==="3" ? <Landing /> : null
            }
          </TabPane>
        </TabContent>
      </article>
    );
  }
}

export default AdminPanel;
