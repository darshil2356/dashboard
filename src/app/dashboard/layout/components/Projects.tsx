// // src/app/components/layout/Projects.tsx
// import React from 'react';

// const Projects = () => {
//   const stats = [
//     { 
//       label: 'Total Projects', 
//       value: '6,784', // Dynamic
//       numColor: 'text-gray-900', // Black for Total
//       icon: 'fi fi-sr-chart-line',
//       changePercent: '+5%', // Dynamic +X%
//       changeToday: '+12 today' // Dynamic +X today
//     },
//     { 
//       label: 'In Progress', 
//       value: '1,920', // Dynamic
//       numColor: 'text-orange-600',
//       icon: 'fi fi-sr-clock',
//       changePercent: '+3%',
//       changeToday: '+8 today'
//     },
//     { 
//       label: 'Completed', 
//       value: '4,412', // Dynamic
//       numColor: 'text-green-600',
//       icon: 'fi fi-sr-check',
//       changePercent: '+7%',
//       changeToday: '+15 today'
//     },
//     { 
//       label: 'Unfinished', 
//       value: '329', // Dynamic
//       numColor: 'text-red-600',
//       icon: 'fi fi-sr-exclamation',
//       changePercent: '-2%',
//       changeToday: '-3 today'
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//       {stats.map((stat, index) => (
//         <div
//           key={index}
//           className="bg-white p-4 rounded-lg shadow-sm h-[146px] flex flex-col justify-between"
//         >
//           {/* Top line: Label + icon */}
//           <div className="flex items-center justify-between">
//             <p className="text-sm font-medium text-gray-600">{stat.label}</p>
//             <i className={`${stat.icon} text-sm text-gray-400`}></i> {/* Small icon right */}
//           </div>
          
//           {/* Middle: Big number */}
//           <div className="flex-1 flex items-center ">
//             <p className={`text-2xl font-bold ${stat.numColor}`}>
//               {stat.value}
//             </p>
//           </div>
          
//           {/* Bottom line: +X% + X today */}
//           <div className="flex items-center gap-[2px]">
//             <span className="text-xs text-green-600 font-medium flex items-center">
//               <i className="fi fi-sr-arrow-up mr-1 text-xs"></i> {/* Up arrow for + */}
//               {stat.changePercent}
//             </span>
//             <span className="text-xs text-gray-500">{stat.changeToday}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Projects;







// 'use client';
// import React, { useEffect, useState } from 'react';

// interface ProjectStat {
//   label: string;
//   value: string;
//   numColor: string;
//   icon: string;
//   changePercent: string;
//   changeToday: string;
// }

// const Projects: React.FC = () => {
//   const [stats, setStats] = useState<ProjectStat[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setStats([
//         { label: 'Total Projects', value: '6,784', numColor: 'text-gray-900', icon: 'fi fi-sr-file', changePercent: '+5%', changeToday: '+12 today' },
//         { label: 'In Progress', value: '1,920', numColor: 'text-orange-600', icon: 'fi fi-sr-time-fast', changePercent: '+3%', changeToday: '+8 today' },
//         { label: 'Completed', value: '4,412', numColor: 'text-green-600', icon: 'fi fi-sr-time-check', changePercent: '+7%', changeToday: '+15 today' },
//         { label: 'Unfinished', value: '329', numColor: 'text-red-600', icon: 'fi fi-sr-time-delete', changePercent: '-2%', changeToday: '-3 today' },
//       ]);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//         {[1, 2, 3, 4].map((i) => (
//           <div
//             key={i}
//             className="bg-white p-4 rounded-lg shadow-sm h-[146px] animate-pulse flex flex-col justify-between"
//           >
//             <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
//             <div className="h-8 w-2/3 bg-gray-200 rounded"></div>
//             <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//       {stats?.map((stat, index) => {
//         const isNegative = stat.changePercent.startsWith('-');
//         const colorClass = isNegative ? 'text-red-600' : 'text-green-600';
//         const arrowIcon = isNegative ? 'fi fi-rr-caret-down' : 'fi fi-rr-caret-up';

//         return (
//           <div
//             key={index}
//             className="bg-white p-4 rounded-lg shadow-sm h-[146px] flex flex-col justify-between"
//           >
//             {/* Label + Icon */}
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium text-gray-600">{stat.label}</p>
//               <i className={`${stat.icon} text-sm text-gray-400`}></i>
//             </div>

//             {/* Main Number */}
//             <div className="flex-1 flex items-center">
//               <p className={`text-2xl font-bold ${stat.numColor}`}>{stat.value}</p>
//             </div>

//             {/* Percent + Today */}
//             <div className="flex items-center gap-2">
//               <span className={`text-xs font-medium flex items-center ${colorClass}`}>
//                 {stat.changePercent}
//                 <i className={`${arrowIcon} ml-1 text-[10px]`}></i>
//               </span>
//               <span className="text-xs text-gray-500">{stat.changeToday}</span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Projects;




'use client';
import React, { useEffect, useState } from 'react';

interface ProjectStat {
  label: string;
  value: string;
  numColor: string;
  icon: string;
  changePercent: string;
  changeToday: string;
}

const Projects: React.FC = () => {
  const [stats, setStats] = useState<ProjectStat[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setStats([
       { label: 'Total Projects', value: '6,784', numColor: 'text-gray-900', icon: 'fi fi-sr-file', changePercent: '10%', changeToday: '+$150 today' },
      { label: 'In Progress', value: '1,920', numColor: 'text-orange-600', icon: 'fi fi-sr-time-fast', changePercent: '10%', changeToday: '+$150 today' },
      { label: 'Completed', value: '4,412', numColor: 'text-green-600', icon: 'fi fi-sr-time-check', changePercent: '10%', changeToday: '+$150 today' },
      { label: 'Unfinished', value: '329', numColor: 'text-red-600', icon: 'fi fi-sr-time-delete', changePercent: '10%', changeToday: '+$150 today' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow-sm h-[146px] animate-pulse flex flex-col justify-between"
          >
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-8 w-2/3 bg-gray-200 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm">
        {error}
      </div>
    );
  }

  // Define per-card icon backgrounds & colors
  const iconStyles = [
    { bg: '#EAF8FF', color: '#2086BF' },
    { bg: '#F866241A', color: '#F86624' },
    { bg: '#E9FAF7', color: '#22CAAD' },
    { bg: '#EB3D4D1A', color: '#EB3D4D' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {stats?.map((stat, index) => {
        const isNegative = stat.changePercent.startsWith('-');
        const colorClass = isNegative ? 'text-red-600' : 'text-green-600';
        const arrowIcon = isNegative ? 'fi fi-rr-caret-down' : 'fi fi-rr-caret-up';
        const iconStyle = iconStyles[index] || iconStyles[0];

        return (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm h-[146px] flex flex-col justify-between"
          >
            {/* Label + Icon */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: iconStyle.bg,
                  width: '36px',
                  height: '36px',
                }}
              >
                <i
                  className={`${stat.icon}`}
                  style={{
                    color: iconStyle.color,
                    fontSize: '18px',
                  }}
                ></i>
              </div>
            </div>

            {/* Main Number */}
            <div className="flex-1 flex items-center">
              <p className={`text-2xl font-bold ${stat.numColor}`}>{stat.value}</p>
            </div>

            {/* Percent + Today */}
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium flex items-center ${colorClass}`}>
                {stat.changePercent}
                <i className={`${arrowIcon} ml-1 text-[10px]`}></i>
              </span>
              <span className="text-xs text-gray-500">{stat.changeToday}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
