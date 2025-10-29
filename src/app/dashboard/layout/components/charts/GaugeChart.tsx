'use client';
import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  percentage: number; // 0-100 dynamic
  unit?: string; // e.g., "%"
  progressColor?: string; // e.g., "#2BB2FE" blue
  trackColor?: string; // e.g., "#E5E7EB" gray
  width?: number; // e.g., 300
  height?: number; // e.g., 300
  className?: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  percentage,
  unit = "%",
  progressColor = "#2BB2FE",
  trackColor = "#E5E7EB",
  width = 300,
  height = 300,
  className = "",
}) => {
  const data = [{ name: 'progress', value: percentage }];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-full h-full">
        <ResponsiveContainer width={width} height={height}>
          <RadialBarChart
            cx="50%"
            cy="65%"
            innerRadius="60%"
            outerRadius="80%"
            barSize={12}
            data={data}
            startAngle={180}
            endAngle={0}
            className="text-gray-800"
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              background
              clockWise
              dataKey="value"
              fill={progressColor}
              backgroundColor={trackColor}
              cornerRadius={10}
              minAngle={15}
            />
            {/* Percentage text - centered above unit */}
            <text
              x="50%"
              y="48%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current font-bold text-3xl"
            >
              {percentage}
            </text>
            {/* Unit text - right below percentage */}
            <text
              x="65%"
              y="48%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current text-sm font-normal text-gray-600"
            >
              {unit}
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GaugeChart;
