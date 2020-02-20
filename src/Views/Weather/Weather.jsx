import React, { Component } from "react";
import axios from 'axios';
import { Row, Col } from "reactstrap";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLat: null,
      currentLong: null,
      weatherData: null,
      damName: null,
      weatherMain: null,
      mainTemp: null,
      mainTempMin: null,
      mainTempMax: null,
      mainHumidity: null,
      windSpeed: null
    };
  }

  componentDidMount() {
    let th = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=Islamabad&appid=2b5de48a4182eb07f49650d4a6a854b1')
    .then(function (response) {
      if (response.data) {
        let damName = response.data.name;
        let weatherMain = response.data.weather[0].main;
        let mainTemp = response.data.main.temp;
        let mainTempMin = response.data.main.temp_min;
        let mainTempMax = response.data.main.temp_max;
        let mainHumidity = response.data.main.humidity;
        let windSpeed = response.data.wind.speed;
        th.setState({ weatherData: response.data, damName, weatherMain, mainTemp, mainTempMin, mainTempMax, mainHumidity, windSpeed }, () => {console.log(th.state.weatherData)});
      }
    })
    .catch(function (error) {
      console.log(error);
     });
  }

  displayLocationInfo = position => {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    this.setState({ currentLat: lat, currentLong: lng });
  };

  render() {
    const todayDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const { damName, weatherMain, mainTemp, mainTempMin, mainTempMax, mainHumidity, windSpeed } = this.state;
    return (
      <div className='theme-container'>
        <article>
          <Row>
            <Col lg={3}>
              <div className='weather-card'>
                <div>
                  <div className='dam-title'>{damName}</div>
                  <div className='weather-date'>{todayDate}</div>
                  <hr />
                  <h3 className='weather-temp'><b>{mainTemp} F</b></h3>
                  <div className='weather-temp-range'>{mainTempMax} / {mainTempMin} F</div>
                  <div className='weather-desc'>{weatherMain}</div>
                  <hr />
                  <div className='wind-speed'>Wind Speed: <b>{windSpeed}</b> km/h</div>
                  <div className='humidity'>Humidity: <b>{mainHumidity}</b> %</div>
                </div>
                <div>
                  <div className='weather-main'>{weatherMain}</div>
                </div>
              </div>
            </Col>
          </Row>
        </article>
      </div>
    );
  }
}

export default Weather;
