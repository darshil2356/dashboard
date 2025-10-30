"use client";
import React from "react";
import WelcomeSection from "./components/WelcomeSection";
import Projects from "./components/Projects";
import LineChartComponent from "./components/charts/LineChart";
import GaugeChart from "./components/charts/GaugeChart";
import { Legend } from "recharts";

interface GaugeData {
  percentage: number;
}

interface LineData {
  month: string;
  [key: string]: number | string;
}

interface LineLine {
  key: string;
  color: string;
  label: string;
}

interface MainContentProps {
  user?: { name: string };
  onDateChange?: (date: Date | null) => void;
  gaugeData?: GaugeData;
  lineData?: LineData[];
  lineLines?: LineLine[];
}

export default function MainContent({
  user = { name: "Jenil Patel" },
  onDateChange,
  gaugeData = { percentage: 76.4 },
  lineData = [
    { month: "Jan", revenue: 4000, sales: 2400 },
    { month: "Feb", revenue: 3000, sales: 1398 },
    { month: "Mar", revenue: 2000, sales: 9800 },
    { month: "Apr", revenue: 2780, sales: 3908 },
    { month: "May", revenue: 1890, sales: 4800 },
    { month: "Jun", revenue: 2390, sales: 3800 },
    { month: "Jul", revenue: 3490, sales: 4300 },
    { month: "Aug", revenue: 1890, sales: 4800 },
    { month: "Sept", revenue: 2390, sales: 3800 },
    { month: "Oct", revenue: 3490, sales: 4300 },
    { month: "Nov", revenue: 2390, sales: 3800 },
    { month: "Dec", revenue: 3490, sales: 4300 },
  ],
  lineLines = [
    { key: "revenue", color: "#2086BF", label: "Revenue" },
    { key: "sales", color: "#F86624", label: "Sales" },
  ],
}: MainContentProps) {
  return (
    <main className="">
      <WelcomeSection user={user} onDateChange={onDateChange} />

      <Projects />

      <div className="grid grid-cols-1 lg:grid-cols-3 p-[4px] gap-6 mb-6 h-[52px]">
         <div className="lg:col-span-1 bg-white p-4 lg:p-6 rounded-lg shadow-sm flex flex-col items-center lg:items-start text-center lg:text-left">

          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-[20px] text-[#1D1F2C]">
              Target
            </h3>
            <i className="fi fi-rr-menu-dots-vertical h-[16px] w-[12px] text-gray-500 cursor-pointer"></i>
          </div>

          <p className="font-normal text-[14px] text-[#777980] mb-4">
            Revenue Target
          </p>

          <GaugeChart
            percentage={gaugeData.percentage}
            label="Achievement Rate"
            unit="%"
            progressColor="#2BB2FE"
            trackColor="#2086BF"
          />

          <p className="text-[14px] font-normal text-[#667085]">
            You succeed earn <span className="font-semibold">$240</span> today,
            it's higher than yesterday
          </p>

          <div className="grid grid-cols-3 text-center  pt-2">
            <div className=" flex flex-col items-center">
              <p className="text-[12px] font-medium text-[#667085]">Target</p>
              <div className="flex  items-center">
                <p className="text-[20px] font-semibold text-[#1D1F2C]">$20k</p>
                <i className="fi fi-rr-arrow-small-down  text-[#EB3D4D] "></i>
              </div>
            </div>
            <div className=" flex flex-col items-center">
              <p className="text-[12px] font-medium text-[#667085]">Revenue</p>
              <div className="flex  items-center">
                <p className="text-[20px] font-semibold text-[#1D1F2C]">$16k</p>
                <i className="fi fi-rr-arrow-small-up  text-[#22CAAD]"></i>
              </div>
            </div>
            <div className=" flex flex-col items-center">
              <p className="text-[12px] font-medium text-[#667085]">Today</p>
              <div className="flex items-center">
                <p className="text-[20px] font-semibold text-[#1D1F2C]">
                  $1.5k
                </p>
                <i className="fi fi-rr-arrow-small-up text-[#22CAAD] "></i>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-[4px] rounded-lg shadow-sm">
          <LineChartComponent
            data={lineData}
            lines={lineLines}
            xKey="month"
            xLabel="Months"
            yLabel=""
            width={600}
            height={300}
          />
        </div>
      </div>
    </main>
  );
}
