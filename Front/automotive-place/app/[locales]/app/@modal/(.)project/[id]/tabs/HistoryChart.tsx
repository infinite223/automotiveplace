"use client";

import { TBasicHistory } from "@/app/utils/types/history";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

interface HistoryChartProps {
  history: TBasicHistory[];
}

export default function HistoryChart({ history }: HistoryChartProps) {
  const chartData = [...history]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((h) => ({
      date: moment(h.date).format("DD.MM.YY"),
      timestamp: new Date(h.date).getTime(),
      mileage: h.mileage,
      title: h.title,
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-amp-900 dark:bg-amp-200 p-3 rounded-md shadow-xl">
          <p className="text-amp-500 font-bold text-xs">
            {payload[0].payload.date}
          </p>
          <p className="text-white text-sm font-semibold">
            {payload[0].payload.title}
          </p>
          <p className="text-amp-300 dark:text-white/80 text-xs">
            {payload[0].value.toLocaleString()} km
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[280px] bg-amp-900/50 dark:bg-amp-50 rounded-md p-4  mb-8">
      <ResponsiveContainer
        width="100%"
        height="100%"
        style={{ outline: "none" }}
      >
        {/* Dodajemy marginesy, żeby podpisy osi były widoczne */}
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorMileage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#db1f48" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#db1f48" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#262626"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            stroke="#525252"
            fontSize={11}
            tickLine={true}
            axisLine={true}
            tick={{ fill: "#a3a3a3" }}
            dy={10}
            label={{
              value: "Data wpisu",
              position: "insideBottom",
              offset: -15,
              fill: "#525252",
              fontSize: 12,
            }}
          />

          <YAxis
            hide={false}
            stroke="#525252"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#a3a3a3" }}
            width={30}
            tickFormatter={(value) => `${value / 1000}k`}
            domain={["dataMin - 5000", "dataMax + 5000"]}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#db1f48", strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="mileage"
            stroke="#db1f48"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorMileage)"
            dot={{ r: 4, fill: "#db1f48", strokeWidth: 2, stroke: "#171717" }}
            activeDot={{
              r: 6,
              fill: "#fff",
              stroke: "#db1f48",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
