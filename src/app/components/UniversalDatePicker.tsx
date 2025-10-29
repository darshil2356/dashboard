"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface UniversalDatePickerProps {
  value?: Date | null;                          // Controlled value (optional)
  onChange?: (date: Date | null) => void;       // Change handler
  placeholder?: string;                         // Custom placeholder
  buttonClassName?: string;                     // Optional styling overrides
  calendarPosition?: "left" | "right";          // Dropdown side
}

const UniversalDatePicker: React.FC<UniversalDatePickerProps> = ({
  value = null,
  onChange,
  placeholder = "Select Date",
  buttonClassName = "",
  calendarPosition = "right",
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [open, setOpen] = useState(false);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    setOpen(false);
    onChange?.(date);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-[#2086BF] hover:text-[#2086BF] transition-colors ${buttonClassName}`}
      >
        <i className="fi fi-sr-calendar text-sm"></i>
        <span className="whitespace-nowrap">
          {selectedDate
            ? selectedDate.toLocaleDateString()
            : placeholder}
        </span>
      </button>

      {open && (
        <div
          className={`absolute mt-2 z-10 ${
            calendarPosition === "right" ? "right-0" : "left-0"
          }`}
        >
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            inline
            calendarClassName="bg-white border border-gray-300 rounded-md shadow-lg p-2"
            dayClassName={() =>
              "w-10 h-10 flex items-center justify-center hover:bg-blue-100 rounded transition-colors text-gray-700"
            }
            showMonthDropdown
            showYearDropdown
            dateFormat="MMMM d, yyyy"
            todayButton="Today"
            className="focus:outline-none"
          />
        </div>
      )}
    </div>
  );
};

export default UniversalDatePicker;
