"use client";
import React from "react";

type EditColumnsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  anchorPos: { top: number; left: number };
  search: string;
  onSearchChange: (value: string) => void;
  columns: { name: string; visible: boolean }[];
  onToggleVisibility: (name: string) => void;
  onReset: () => void;
};

export default function EditColumnsModal({
  isOpen,
  onClose,
  anchorPos,
  search,
  onSearchChange,
  columns,
  onToggleVisibility,
  onReset,
}: EditColumnsModalProps) {
  if (!isOpen) return null;

  const filteredColumns = columns.filter((col) =>
    col.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="fixed inset-0 z-[998]" onClick={onClose} />

      <div
        className="absolute z-[999] bg-white rounded-xl shadow-xl w-[320px] p-4"
        style={{
          position: "fixed",
          top: anchorPos.top,
          left: anchorPos.left,
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Edit Columns
          </h3>
          <button onClick={onClose}>
            <i className="fi fi-rr-angle-small-up text-xl text-gray-700"></i>
          </button>
        </div>

        <button
          onClick={onReset}
          className="text-[#2086BF] text-sm font-medium mb-3"
        >
          Reset Columns
        </button>

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full border border-[#2086BF] rounded-md px-3 py-2 text-sm outline-none"
          placeholder="Find a Column"
        />

        <div className="mt-3 space-y-3 max-h-[260px] overflow-y-auto pr-1">
          {filteredColumns.map((col, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-sm text-gray-700"
            >
              <div className="flex items-center gap-2">
                <i className="fi fi-rr-drag text-gray-400 text-sm"></i>
                <span>{col.name}</span>
              </div>
              <button onClick={() => onToggleVisibility(col.name)}>
                {col.visible ? (
                  <i className="fi fi-rr-eye text-gray-400 text-sm"></i>
                ) : (
                  <i className="fi fi-rr-eye-crossed text-gray-400 text-sm"></i>
                )}
              </button>
            </div>
          ))}

          {filteredColumns.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-2">
              No matching columns
            </p>
          )}
        </div>
      </div>
    </>
  );
}
