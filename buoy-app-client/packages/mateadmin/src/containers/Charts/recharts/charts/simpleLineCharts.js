import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class extends Component {
  render() {
    const { datas, width, height, colors } = this.props;
    // <div className="chartWrapper">
    return (
      <LineChart
        width={width}
        height={height}
        data={datas}
        margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
      >
        <XAxis dataKey="time" stroke={colors[3]} />
        <YAxis stroke={colors[3]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke={colors[0]}
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="ph" stroke={colors[1]} />
      </LineChart>
    );
  }
}
