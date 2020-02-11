import React, { PureComponent } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts';

const data = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];

class Piechart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { title, chartMargin } = this.props;
    return (
      <article className='out-card'>
        <Card>
          <CardHeader>{title}</CardHeader>
          <CardBody>
            <ResponsiveContainer>
              <PieChart margin={chartMargin}>
                <Pie dataKey="value" data={data} fill="#8884d8" label />
                <Tooltip />
              </PieChart>
              </ResponsiveContainer>
          </CardBody>
        </Card>
      </article>
    );
  }

}

export default Piechart;

Piechart.defaultProps = {
  title: 'Chart Title', /* title of chart at card-header */
  chartMargin: { top: 10, right: 30, left: 0, bottom: 5 }, /* Change margin of chart inside the card */
}