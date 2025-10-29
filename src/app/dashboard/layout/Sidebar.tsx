"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation"; // ✅ for routing
import logo from "../../../../public/Logo.png";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [ecomOpen, setEcomOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "fi fi-sr-apps", path: "/dashboard" },
    {
      name: "E-Commerce",
      icon: "fi fi-sr-shopping-cart",
      subItems: [
        { name: "Product", path: "/dashboard/product" },
        { name: "Categories", path: "/dashboard/categories" },
        { name: "Orders", path: "/dashboard/orders" },
      ],
    },
    { name: "Project", icon: "fi fi-sr-file", path: "/project" },
  ];

  return (
    <>
      {/* === Mobile Toggle Button === */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#2086BF] text-white px-3 py-2 rounded-md shadow-md focus:outline-none"
        onClick={() => setIsMobileOpen((prev) => !prev)}
      >
        {isMobileOpen ? "✕" : "☰"}
      </button>

      {/* === Sidebar Container === */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-white text-black shadow-sm transform transition-transform duration-300 ease-in-out z-40
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ width: "264px" }}
      >
        {/* ===== Header ===== */}
        <div className="flex items-center justify-center h-[82px] w-full px-4 md:px-0">
          <div className="flex items-center justify-start w-full md:w-[224px] h-[34px]">
            <div
              className="flex items-center justify-center rounded"
              style={{ width: "34px", height: "34px" }}
            >
              <Image
                src={logo}
                alt="Logo"
                width={34}
                height={34}
                className="object-contain"
              />
            </div>
            <div
              className="flex items-center font-bold text-xl pl-2 truncate md:pl-3"
              style={{ width: "calc(100% - 40px)" }}
            >
              Mytech
            </div>
          </div>
        </div>

        {/* ===== Menu ===== */}
        <nav className="mt-[10px] overflow-y-auto pb-10">
          <ul>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name} className="mb-2">
                  <button
                    onClick={() => {
                      if (item.subItems) {
                        setEcomOpen((prev) => !prev);
                      } else {
                        router.push(item.path);
                        setIsMobileOpen(false);
                      }
                    }}
                    className={`flex items-center justify-between w-full px-4 md:px-6 py-3 rounded transition-all duration-200 border-l-4
                      ${
                        isActive
                          ? "border-[#2086BF] text-[#2086BF] bg-blue-50"
                          : "border-transparent text-black hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center">
                      <i
                        className={`${item.icon} mr-2`}
                        style={{ color: isActive ? "#2086BF" : "#4A4C56" }}
                      ></i>
                      <span className="truncate">{item.name}</span>
                    </div>

                    {item.subItems && (
                      <span
                        className={`transition-transform duration-200 text-[#4A4C56] ${
                          ecomOpen ? "rotate-180" : ""
                        }`}
                      >
                        <i className="fi fi-sr-caret-up"></i>
                      </span>
                    )}
                  </button>

                  {/* ==== Sub Items ==== */}
                  {item.subItems && ecomOpen && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {item.subItems.map((sub) => {
                        const subActive = pathname === sub.path;
                        return (
                          <li key={sub.name}>
                            <button
                              onClick={() => {
                                router.push(sub.path);
                                setIsMobileOpen(false);
                              }}
                              className={`block w-full text-left px-3 py-1 rounded transition-colors duration-200 truncate ${
                                subActive
                                  ? "text-[#2086BF] font-medium bg-blue-50"
                                  : "text-[#4A4C56] hover:text-[#2086BF]"
                              }`}
                            >
                              {sub.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* === Overlay for mobile === */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
