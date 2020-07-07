import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default class extends Component {
  
  render() {
    const { datas, width, height, colors } = this.props;
    console.log(datas);
    return (
      <BarChart
        width={width}
        height={height}
        data={datas}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="label" stroke={colors[3]} />
        <YAxis stroke={colors[3]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="numberOfProblems" fill={colors[0]} />
      </BarChart>
    );
  }
}
