import React from "react";
import { Line } from "react-chartjs-2";

class LineChart extends React.Component {
  render() {
    return <Line data={this.props.data} />;
  }
}

export default LineChart;
