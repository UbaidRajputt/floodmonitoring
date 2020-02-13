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
        <Row>
        <Col sm="4">
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
          </Col>
          <Col sm="4">
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
          </Col>
          <Col sm="4">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              New Records
            </NavLink>
          </NavItem>
          </Col>
          </Row>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="2" lg="2" />
              <Col sm="6" lg="6">
              <SmsAlerts usersList={this.state.usersList} firebase={firebase}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
                <ManageUsers getAllUsers={this.getAllUsers} firebase={firebase} />
          </TabPane>
        </TabContent>
      </article>
    );
  }
}

export default AdminPanel;
