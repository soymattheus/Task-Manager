"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

interface DataProps {
  label: string;
  value: number;
}

interface RadarProps {
  data: DataProps[];
}

// #endregion
const UserDataRadarChart = ({ data }: RadarProps) => {
  return (
    <RadarChart
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
      outerRadius="80%"
      data={data}
      margin={{
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
      }}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="label" />
      <PolarRadiusAxis />
      <Radar
        name="Mike"
        dataKey="value"
        stroke="#62BD9B"
        fill="#3E8269"
        fillOpacity={0.6}
      />
      <RechartsDevtools />
    </RadarChart>
  );
};

export default UserDataRadarChart;
