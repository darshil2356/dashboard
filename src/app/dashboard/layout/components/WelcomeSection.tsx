// 'use client';
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

// interface User {
//   name: string;
// }

// interface WelcomeSectionProps {
//   user: User;
//   onDateChange?: (date: Date | null) => void;
// }

// const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user, onDateChange }) => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null); // ✅ no default date
//   const [calendarOpen, setCalendarOpen] = useState(false);

//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//     setCalendarOpen(false);
//     if (onDateChange) onDateChange(date);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg mb-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-1">
//             Welcome back, {user.name}
//           </h1>
//           <p className="text-gray-600">
//             Here’s what’s happening with your projects today.
//           </p>
//         </div>

//         {/* Date Picker */}
//         <div className="mt-4 md:mt-0 relative">
//           <button
//             onClick={() => setCalendarOpen(!calendarOpen)}
//             className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-[#2086BF] hover:text-[#2086BF] transition-colors"
//           >
//             <i className="fi fi-sr-calendar text-sm"></i>
//             <span>
//               {selectedDate
//                 ? selectedDate.toLocaleDateString()
//                 : 'Select Dates'} {/* ✅ default text */}
//             </span>
//           </button>

//           {calendarOpen && (
//             <div className="absolute right-0 mt-2 z-10">
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={handleDateChange}
//                 inline
//                 calendarClassName="bg-white border border-gray-300 rounded-md shadow-lg p-2"
//                 dayClassName={() =>
//                   "w-10 h-10 flex items-center justify-center hover:bg-blue-100 rounded transition-colors text-gray-700"
//                 }
//                 showMonthDropdown
//                 showYearDropdown
//                 // dropdownClassName="bg-white border border-gray-300 rounded-md shadow-lg"
//                 dateFormat="MMMM d, yyyy"
//                 todayButton="Today"
//                 className="focus:outline-none"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeSection;





import UniversalDatePicker from "../../../components/UniversalDatePicker";

const WelcomeSection = ({ user, onDateChange }) => (
  <div className="bg-white p-6 rounded-lg mb-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-600">
          Here’s what’s happening with your projects today.
        </p>
      </div>

      <UniversalDatePicker
        onChange={onDateChange}
        placeholder="Select Dates"
        calendarPosition="right"
      />
    </div>
  </div>
);
export default WelcomeSection;