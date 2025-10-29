"use client";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
  onApply: (min: number, max: number, sort?: string) => void;
  onSearchChange?: (query: string) => void; // NEW: Pass from parent for search
};

export default function FilterModal({
  isOpen,
  onClose,
  anchorRef,
  onApply,
  onSearchChange,
}: Props) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [searchQuery, setSearchQuery] = useState(""); // NEW: Local search, but sync to parent
  const [min, setMin] = useState<number>(0); // FIXED: Better default
  const [max, setMax] = useState<number>(10000);
  const [sort, setSort] = useState<string>(""); // "asc" | "desc" | ""
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  

  // position below button
  useEffect(() => {
    if (!isOpen) return;
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      const modalWidth = 320;
      const padding = 8;
      let left = rect.left + window.scrollX;
      const top = rect.bottom + 8 + window.scrollY;

      if (left + modalWidth > window.innerWidth - padding) {
        left = window.innerWidth - modalWidth - padding;
      }
      if (left < padding) left = padding;
      setPosition({ top, left });
    }
  }, [isOpen, anchorRef]);

  // NEW: Sync search to parent on change (for table filtering)
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(searchQuery);
    }
  }, [searchQuery, onSearchChange]);

  if (!isOpen) return null;

  // helpers to keep a minimum gap between handles
  const MIN_GAP = 50;

  const handleClearAll = () => {
    setMin(0);
    setMax(10000);
    setSort("");
    setSearchQuery(""); // NEW: Clear search too
    if (onSearchChange) onSearchChange(""); // Apply clear
    onApply(0, 10000, ""); // FIXED: Apply reset to parent
  };

  return (
    <>
      {/* overlay to close on click outside (semi-transparent) */}
      <div className="fixed inset-0 z-[998]  bg-opacity-10" onClick={onClose} />

      {/* modal */}
      {/* <div
        className="fixed z-[9999] w-[320px] bg-white border border-gray-200 rounded-2xl shadow-lg p-4"
        style={{ top: position.top, left: position.left }}
      > */}
      <div
        className={`fixed z-[9999] w-[320px] bg-white border border-gray-200 rounded-2xl shadow-lg p-4 transition-all duration-300 ease-in-out`} // Bump duration for smoother expand

        style={{
          top: position.top,
          left: position.left,
          maxHeight: "90vh",
          overflowY: "auto",
          overflowX: "visible", // allow dropdowns to expand horizontally if needed
          
        }}
      >
        {/* header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-800">Filter</h3>
          </div>
          <div className="text-sm">
            <button
              onClick={handleClearAll}
              className="text-[#2086BF] text-sm hover:underline"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Search box (blue inner border like image, now functional) */}
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-[#CDEDF9] outline-none rounded-md px-3 py-2 text-sm mb-3 focus:border-[#2086BF]"
        />

        {/* checkboxes for sort (fixed labels) */}
        <div className="flex flex-col gap-2 text-sm text-gray-700 mb-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sort === "asc"}
              onChange={(e) => setSort(e.target.checked ? "asc" : "")}
            />
            <span>Low to high</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sort === "desc"}
              onChange={(e) => setSort(e.target.checked ? "desc" : "")}
            />
            <span>High to low</span>
          </label>
        </div>

        {/* FIXED: Single bar with two draggable handles + visible blue bar */}
        <div className="mb-2">
          <div className="relative h-6">
            {/* background track */}
            <div className="absolute left-0 right-0 top-1/2 h-[6px] bg-gray-200 rounded-full -translate-y-1/2" />
            {/* active range bar - now properly sized */}
            <div
              className="absolute top-1/2 h-[6px] bg-[#2086BF] rounded-full -translate-y-1/2"
              style={{
                left: `${(min / 10000) * 100}%`, // FIXED: Scale to 1000 max
                width: `${((max - min) / 10000) * 100}%`,
              }}
            />
            {/* left handle (min) - FIXED: Visible, draggable */}
            <input
              type="range"
              min={0}
              max={10000}
              value={min}
              onChange={(e) => {
                const v = Number(e.target.value);
                const bounded = Math.min(v, max - MIN_GAP);
                setMin(bounded);
              }}
              className="absolute w-full h-6 appearance-none pointer-events-auto z-30"
              style={{
                background: "transparent",
                WebkitAppearance: "none",
                height: "6px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            {/* Custom thumb for left handle */}
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 16px;
                height: 16px;
                background: white;
                border: 2px solid #2086bf;
                border-radius: 50%;
                cursor: pointer;
                margin-top: -5px;
              }
              input[type="range"]::-moz-range-thumb {
                width: 16px;
                height: 16px;
                background: white;
                border: 2px solid #2086bf;
                border-radius: 50%;
                cursor: pointer;
              }
            `}</style>
            {/* right handle (max) - FIXED: Same as left */}
            <input
              type="range"
              min={0}
              max={10000}
              value={max}
              onChange={(e) => {
                const v = Number(e.target.value);
                const bounded = Math.max(v, min + MIN_GAP);
                setMax(bounded);
              }}
              className="absolute w-full h-6 appearance-none pointer-events-auto z-40 ml-[16px]" // Offset to avoid overlap
              style={{
                background: "transparent",
                WebkitAppearance: "none",
                height: "6px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>

          {/* numeric labels under bar */}
          <div className="flex justify-between text-xs text-gray-600 mt-2 mb-3">
            <span>${min}</span>
            <span>${max}</span>
          </div>
        </div>

        {/* numeric input boxes like image */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            type="number"
            value={min}
            onChange={(e) => {
              const v = Number(e.target.value || 0);
              const bounded = Math.min(v, max - MIN_GAP);
              setMin(bounded);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-center"
            placeholder="Min"
          />
          <input
            type="number"
            value={max}
            onChange={(e) => {
              const v = Number(e.target.value || 10000);
              const bounded = Math.max(v, min + MIN_GAP);
              setMax(bounded);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-center"
            placeholder="Max"
          />
        </div>

        {/* dropdown (styled like image) - not wired yet, but kept */}
        {/* <div className="mb-3">
          <select className="w-full border border-[#CDEDF9] rounded-md px-3 py-2 text-sm focus:border-[#2086BF]">
            <option>(=) Equals</option>
            <option>(&lt;) Less Than</option>
            <option>(&gt;) Greater Than</option>
            <option>(&lt;=) Less Than Equal</option>
            <option>(&gt;=) Greater Than Equal</option>
          </select>
        </div> */}

        <div className="mb-3 relative">
          <select
            className="w-full border border-[#CDEDF9] rounded-md px-3 py-2 text-sm focus:border-[#2086BF]"
            onClick={() => setDropdownOpen((prev) => !prev)} // toggle on click
            onBlur={() => setDropdownOpen(false)} // close when focus lost
          >
            <option>(=) Equals</option>
            <option>(&lt;) Less Than</option>
            <option>(&gt;) Greater Than</option>
            <option>(&lt;=) Less Than Equal</option>
            <option>(&gt;=) Greater Than Equal</option>
          </select>
        </div>

        <button
          onClick={() => {
            onApply(min, max, sort);
            onClose();
          }}
          className="w-full bg-[#2086BF] text-white py-2 rounded-md text-sm hover:bg-[#1a6f9a] transition-colors"
        >
          Apply
        </button>
      </div>
    </>
  );
}
