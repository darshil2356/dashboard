"use client";
import React from "react";
import MainContent from "./layout/MainContent";

const page = () => {
  return (
    <MainContent
      user={{ name: "Jenil Patel" }} // Or from state
      onDateChange={(date) => console.log("Date picked:", date)} // Or your API refetch
    />
  );
};

export default page;
