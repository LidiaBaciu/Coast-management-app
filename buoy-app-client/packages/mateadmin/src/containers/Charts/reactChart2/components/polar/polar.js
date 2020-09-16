import React from "react";
import { Polar } from "react-chartjs-2";

class PolarChart extends React.Component {
  render() {
    return <Polar data={this.props.data} height={this.props.height} />;
  }
}

export default PolarChart;
