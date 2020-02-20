import React, { Component } from "react";
//Optional include of the default css styles
import "react-open-weather/lib/css/ReactWeather.css";
import { Row, Col } from "reactstrap";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLat: null,
      currentLong: null
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }
  }

  displayLocationInfo = position => {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    this.setState({ currentLat: lat, currentLong: lng });
  };

  render() {
    const { currentLat, currentLong } = this.state;
    return (
      <article>
      </article>
    );
  }
}

export default Weather;
