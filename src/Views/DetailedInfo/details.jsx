import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Barchart from './../../Components/Charts/barChart';
import Linechart from './../../Components/Charts/lineChart';
import Areachart from './../../Components/Charts/areaChart';
import Piechart from './../../Components/Charts/pieChart';

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <article className='board'>
        <h2 className='uppercase'>Charts</h2>
        <hr />
        <div className='chart-filter'>
          <button className='button active'>Yearly</button>
          <button className='button'>Monthly</button>
          <button className='button'>weakly</button>
        </div>
        <hr />
        <Row>
          <Col sm={6} lg={4}>
            <Barchart />
          </Col>
          <Col sm={6} lg={4}>
            <Linechart />
          </Col>
          <Col sm={6} lg={4}>
            <Areachart />
          </Col>
          <Col sm={6} lg={4}>
            <Piechart />
          </Col>
        </Row>
      </article>
    );
  }

}

export default Details;