"use client";
import Sidebar from "../app/dashboard/layout/Sidebar";
import Header from "../app/dashboard/layout/Header";
import { useState } from "react";
import MainContent from "./dashboard/layout/MainContent";

export default function DashboardPage() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (query: string) => {
    setSearchValue(query);
    console.log("Search:", query);
  };

  return (
    <div className="flex h-screen bg-[#FBFBFB]">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Right-side Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          user={{ name: "Om Patel" }}
          badges={{ notifications: 3 }}
          searchValue={searchValue}
          onSearch={handleSearch}
          // onExport={() => console.log('Export PDF')}
        />

        {/* Main Content */}

        <MainContent
          user={{ name: "Jenil Patel" }} // Or from state
          onDateChange={(date) => console.log("Date picked:", date)} // Or your API refetch
        >
          {/* Your other dashboard kids here, like stats/charts */}
         
        </MainContent>
      </div>
    </div>
  );
}
