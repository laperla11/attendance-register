import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import "./index.css"

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/30763kr7/";

  render() {
    console.log(this.props.data)
    const data = this.props.modules.map(modul => {
      return { name: modul.name, "%": Number(modul.attendanceRate) }
    })
    return (
      <BarChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 100
        }}

      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} stroke="#dcebdc" />
        <YAxis stroke="#dcebdc" />
        <Tooltip contentStyle={{ backgroundColor: '#4A4A4A', color: '#dcebdc' }} />

        <Bar dataKey="%" fill="#dcebdc" barSize={30} />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    );
  }
}
