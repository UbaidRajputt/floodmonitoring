import React, { PureComponent } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class StackBar extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { title, chartMargin, data, data1, data2, data3, color1, color2, color3 } = this.props;
    return (
      <article className='out-card'>
        <Card>
          <CardHeader>{title}</CardHeader>
          <CardBody>
            <ResponsiveContainer>
              <BarChart
                data={data}
                margin={chartMargin}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Period Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar stackId="a" dataKey={data1} fill={color1} />
                <Bar stackId="a" dataKey={data2} fill={color2} />
                <Bar stackId="a" dataKey={data3} fill={color3} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </article>
    );
  }

}

export default StackBar;

StackBar.defaultProps = {
  title: 'Chart Title', /* title of chart at card-header */
  chartMargin: { top: 10, right: 30, left: 0, bottom: 5 }, /* Change margin of chart inside the card */
}