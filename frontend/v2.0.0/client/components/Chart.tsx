import React, { FC } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

type Props = {
  result: { [name: string]: string };
};

export const Chart: FC<Props> = ({ result }) => {
  const data = () => {
    const arr: { subject: string; A: number; B: number }[] = [];
    let i = 0;
    for (const key in result) {
      const values = result[key].split("に対し");
      arr[i] = {
        subject: key,
        A: (parseFloat(values[1]) / parseFloat(values[0])) * 100,
        B: 100,
      };
      i++;
    }
    console.log(arr);
    return arr;
  };

  console.log(data());

  return (
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={100}
      width={600}
      height={500}
      data={data()}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} />
      <Radar
        name="充足率"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
      <Radar
        name="100%"
        dataKey="B"
        stroke="red"
        fill="transparent"
        fillOpacity={0.6}
      />
      <Legend />
    </RadarChart>
  );
};
