import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import Papa from "papaparse";
import firebase from "../../Components/Firebase/firebaseSetup";

class DetailsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      error: "",
      list: [],
      data: []
    };
  }

  handleFileChange = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  downloadFromFirebase = (name) => {
      let th = this;
        firebase
          .database()
          .ref(name)
          .once("value", function(snapshot) {
            th.setState({ data: Object.values(snapshot.val())[0] })
          });
  };

  getList = () => {
      let th = this;
    firebase
    .database()
    .ref("DataNames/")
    .once("value", function(snapshot) {
      th.setState({ list: Object.values(snapshot.val()) });
    })
  }

  convertCsvToJson = () => {
    let { file } = this.state;
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: function(results){
          firebase
            .database()
            .ref(file.name.split(".")[0])
            .push({ ...results.data });
          firebase
            .database()
            .ref("DataNames/")
            .push(file.name.split(".")[0]);
        }
      });
    }
  };

  render() {
    const { list, data } = this.state;
    return (
      <div>
        <h1>Charts Page</h1>
        <Input type="file" name="file" onChange={this.handleFileChange} />
        <Button onClick={this.convertCsvToJson}>Convert to Json</Button>
        <Button onClick={this.getList}>Get List</Button>
        <ul>
          {list &&
            list.map((li, key) => {
              return (
                <li onClick={() => this.downloadFromFirebase(li)}>{li}</li>
              );
            })}
        </ul>

        <button onClick={() => { firebase.auth().signOut()} }> logout </button>
      </div>
    );
  }
}

export default DetailsInfo;
