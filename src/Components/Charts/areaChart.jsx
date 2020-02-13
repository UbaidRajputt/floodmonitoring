import React, { PureComponent } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class Areachart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { title, chartMargin, data, data1, color } = this.props;
    return (
      <article className='out-card'>
        <Card>
          <CardHeader>{title}</CardHeader>
          <CardBody>
            <ResponsiveContainer>
              <AreaChart
              data={data}
              margin={chartMargin}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Period Date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey={data1} stroke="#8884d8" fill={color} />
            </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </article>
    );
  }

}

export default Areachart;

Areachart.defaultProps = {
  title: 'Chart Title', /* title of chart at card-header */
  chartMargin: { top: 10, right: 30, left: 0, bottom: 5 }, /* Change margin of chart inside the card */
}