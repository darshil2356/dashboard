"use client";
import { useState } from "react";
import Header from "../dashboard/layout/Header";
import Sidebar from "../dashboard/layout/Sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (query: string) => {
    setSearchValue(query);
    console.log("Search:", query);
  };
  return (
    <div className="flex h-screen bg-[#FBFBFB]">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Header
          user={{ name: "Om Patel" }}
          badges={{ notifications: 3 }}
          searchValue={searchValue}
          onSearch={handleSearch}
        />
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
