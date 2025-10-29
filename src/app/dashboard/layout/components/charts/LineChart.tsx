'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  [key: string]: number | string;
}

interface LineChartProps {
  data: DataPoint[];
  lines: { key: string; color: string; label?: string }[];
  xKey: string;
  xLabel?: string;
  yLabel?: string;
  yUnit?: string; // ✅ new — example: "$", "₹", "yen"
  width?: number;
  height?: number;
  className?: string;
}

const LineChartComponent: React.FC<LineChartProps> = ({
  data,
  lines,
  xKey,
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
  yUnit = '',
  className = "",
}) => {
  return (


<div className={`w-full h-full ${className}  `}>
  {/* Custom Legend/Header */}
  <div className="mb-4">
     <h3 className="text-[20px] font-semibold text-gray-800">Statistic</h3>
     <div className="flex justify-between items-center mt-2">
      <span className="text-[14px] font-normal text-[#777980]">Revenue and Sales</span>
          
      <div className="flex gap-4">
        {lines.map((line) => (
          <span key={line.key} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: line.color }}
            />
            {line.label}
          </span>
        ))}
      </div>
    </div>
  </div>

  {/* Chart */}
  {/* <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
      <XAxis dataKey={xKey} label={{ value: xLabel, position: 'insideBottom', offset: -5, style: { fontSize: 12 } }} tick={{ fontSize: 11, fill: '#666' }} />
      <YAxis tickFormatter={(value) => `${yUnit}$${value}`} label={{ value: yLabel, angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} tick={{ fontSize: 11, fill: '#666' }} />
      <Tooltip formatter={(value) => `${value}${yUnit}`} />
      {lines.map((line) => (
        <Line
          key={line.key}
          type="monotone"
          dataKey={line.key}
          stroke={line.color}
          strokeWidth={2}
          name={line.label || line.key}
          dot={{ fill: line.color, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: line.color, strokeWidth: 2 }}
        />
      ))}
    </LineChart>
  </ResponsiveContainer> */}



  <ResponsiveContainer width="100%" height={300}>
  <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
    {/* Dotted horizontal lines for each Y-axis tick */}
    <CartesianGrid stroke="#858D9D" strokeDasharray="4 4" vertical={false} />

    <XAxis
      dataKey={xKey}
      axisLine={false}     
      label={{ value: xLabel, position: 'insideBottom', offset: -5, style: { fontSize: 12 } }}
      tick={{ fontSize: 11, fill: '#666' }}
    />

    <YAxis
      tickFormatter={(value) => `${yUnit}$${value}`}
      axisLine={false}     
      label={{ value: yLabel, angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
      tick={{ fontSize: 11, fill: '#666' }}
    />

    <Tooltip formatter={(value) => `${value}${yUnit}`} />

    {lines.map((line) => (
      <Line
        key={line.key}
        type="monotone"
        dataKey={line.key}
        stroke={line.color}
        strokeWidth={2}
        name={line.label || line.key}
        dot={{ fill: line.color, strokeWidth: 2, r: 4 }}
        activeDot={{ r: 6, stroke: line.color, strokeWidth: 2 }}
      />
    ))}
  </LineChart>
</ResponsiveContainer>

</div>

  );
};

export default LineChartComponent;
