'use client';
import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  percentage: number; 
  unit?: string; 
  progressColor?: string;
  trackColor?: string; 
  width?: number; 
  height?: number; 
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
      <div className="">
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
          
            <text
              x="50%"
              y="48%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current font-bold text-3xl"
            >
              {percentage}
            </text>
          
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
