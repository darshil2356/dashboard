"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import FilterModal from "./FilterModal";
import EditColumnsModal from "./EditColumnsModal";
import UniversalDatePicker from "@/app/components/UniversalDatePicker";

import { useRouter } from "next/navigation";

type ProductStatus = "published" | "draft" | "low" | "out";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: ProductStatus;
  added: string; // iso date
};

// Mock data (fallback if localStorage empty or invalid)
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Handmade Pouch",
    sku: "300212",
    category: "Bags & Pouch",
    stock: 10,
    price: 121,
    status: "low",
    added: "2022-12-29",
  },
  {
    id: "2",
    name: "Smartwatch E2",
    sku: "300211",
    category: "Watch",
    stock: 204,
    price: 580,
    status: "published",
    added: "2022-12-24",
  },
  {
    id: "3",
    name: "Smartwatch E1",
    sku: "300202",
    category: "Watch",
    stock: 48,
    price: 125,
    status: "draft",
    added: "2022-12-12",
  },
  {
    id: "4",
    name: "Headphone G1 Pro",
    sku: "300301",
    category: "Audio",
    stock: 401,
    price: 348,
    status: "published",
    added: "2022-11-21",
  },
  {
    id: "5",
    name: "Iphone X",
    sku: "301000",
    category: "Smartphone",
    stock: 120,
    price: 607,
    status: "published",
    added: "2022-10-21",
  },
  {
    id: "6",
    name: "Puma Shoes",
    sku: "301801",
    category: "Shoes",
    stock: 432,
    price: 234,
    status: "published",
    added: "2022-10-21",
  },
  {
    id: "7",
    name: "Logic+ Wireless Mouse",
    sku: "301643",
    category: "Mouse",
    stock: 0,
    price: 76,
    status: "out",
    added: "2022-09-15",
  },
  {
    id: "8",
    name: "Nike Shoes",
    sku: "301600",
    category: "Shoes",
    stock: 347,
    price: 400,
    status: "published",
    added: "2022-09-10",
  },
  {
    id: "9",
    name: "Lego Car",
    sku: "301555",
    category: "Toys",
    stock: 298,
    price: 82,
    status: "published",
    added: "2022-08-08",
  },
  {
    id: "10",
    name: "PS Wireless Controller",
    sku: "301002",
    category: "Beauty",
    stock: 38,
    price: 123,
    status: "draft",
    added: "2022-08-10",
  },
];

const PAGE_SIZE_OPTIONS = [5, 10, 20];
const STORAGE_KEY = "mockProducts";

export default function ProductTable({ onDateChange }) {
  // const [products, setProducts] = useState<Product[]>(() => {
  //   if (typeof window === "undefined") return mockProducts;
  //   const saved = localStorage.getItem(STORAGE_KEY);
  //   if (!saved) return mockProducts;
  //   try {
  //     const parsed: any[] = JSON.parse(saved);
  //     // Filter/map to ensure only valid Product objects (ignore extra fields from form like description/images)
  //     const validProducts = parsed
  //       .filter((p): p is Product => 
  //         p.id && p.name && p.sku && p.category && typeof p.stock === "number" && typeof p.price === "number" && p.status && p.added
  //       )
  //       .map((p) => ({
  //         ...p,
  //         status: p.status as ProductStatus, // Ensure type
  //         stock: Math.max(0, p.stock), // Sanitize non-negative
  //         price: Math.max(0, p.price),
  //       }));
  //     // Merge with mock: add new ones to mock if not already in mock (avoid duplicates by id)
  //     const merged = [...mockProducts];
  //     validProducts.forEach((newP) => {
  //       if (!merged.some((m) => m.id === newP.id)) {
  //         merged.push(newP);
  //       }
  //     });
  //     return merged;
  //   } catch (e) {
  //     console.warn("Failed to load products from localStorage:", e);
  //     return mockProducts;
  //   }
  // });

const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  // Load from localStorage
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    // If nothing stored yet → write mockProducts
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts));
    setProducts(mockProducts);
  } else {
    try {
      const parsed: Product[] = JSON.parse(saved);
      setProducts(parsed);
    } catch {
      // If corrupted storage → reset with mockProducts
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts));
      setProducts(mockProducts);
    }
  }
}, []);

  console.log("products",mockProducts)

function handleDelete(id: string) {
  setProducts((prev) => {
    const updated = prev.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  });
}


  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "published" | "low" | "draft">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<{ column: keyof Product | null; dir: "asc" | "desc"; }>({ column: null, dir: "asc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [columnsModalOpen, setColumnsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const router = useRouter();

  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [priceSort, setPriceSort] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const filterBtnRef = useRef<HTMLButtonElement>(null);

  const [columns, setColumns] = useState<{ name: string; visible: boolean }[]>([]);

  const STORAGE_KEY = "mockProducts";

  // Reload from localStorage on storage change (for same-tab updates) and focus (for cross-tab)
  useEffect(() => {
    const handleStorageOrFocus = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed: any[] = JSON.parse(saved);
          const validProducts = parsed
            .filter((p): p is Product => 
              p.id && p.name && p.sku && p.category && typeof p.stock === "number" && typeof p.price === "number" && p.status && p.added
            )
            .map((p) => ({
              ...p,
              status: p.status as ProductStatus,
              stock: Math.max(0, p.stock),
              price: Math.max(0, p.price),
            }));
          const merged = [...mockProducts];
          validProducts.forEach((newP) => {
            const existingIdx = merged.findIndex((m) => m.id === newP.id);
            if (existingIdx !== -1) {
              merged[existingIdx] = { ...merged[existingIdx], ...newP }; // Update existing
            } else {
              merged.push(newP); // Add new
            }
          });
          setProducts(merged);
          // Reset page if needed to avoid empty pages
          if (page > Math.ceil(merged.length / pageSize)) setPage(1);
        } catch (e) {
          console.warn("Failed to reload from localStorage:", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageOrFocus);
    window.addEventListener("focus", handleStorageOrFocus);

    return () => {
      window.removeEventListener("storage", handleStorageOrFocus);
      window.removeEventListener("focus", handleStorageOrFocus);
    };
  }, [page, pageSize]);

  const filtered = useMemo(() => {
    let res = products.slice();
    if (activeTab === "published") res = res.filter((p) => p.status === "published");
    if (activeTab === "low") res = res.filter((p) => p.status === "low");
    if (activeTab === "draft") res = res.filter((p) => p.status === "draft");

    if (statusFilter !== "all") res = res.filter((p) => p.status === statusFilter);

    const [minPrice, maxPrice] = priceRange;
    if (minPrice > 0 || maxPrice < 10000) {
      res = res.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      res = res.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    const effectiveSort = priceSort ? { column: "price" as keyof Product, dir: priceSort } : sortBy;
    if (effectiveSort.column) {
      res.sort((a, b) => {
        const col = effectiveSort.column!;
        let av: any = a[col];
        let bv: any = b[col];
        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();
        if (av > bv) return effectiveSort.dir === "asc" ? 1 : -1;
        if (av < bv) return effectiveSort.dir === "asc" ? -1 : 1;
        return 0;
      });
    }

    return res;
  }, [products, activeTab, query, statusFilter, priceRange, priceSort, sortBy]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setCalendarOpen(false);
    if (onDateChange) onDateChange(date);
  };

  // useEffect(() => {
  //   if (products.length > 0 && columns.length === 0) {
  //     const keys = Object.keys(products[0])
  //       .filter((k) => !["id", "created_at", "updated_at"].includes(k))
  //       .map((k) => (k === "name" ? "product" : k));
  //       // .map((k) => k);

  //     setColumns(keys.map((k) => ({ name: k, visible: true })));
  //   }
  // }, [products]);

  useEffect(() => {
  if (products.length > 0 && columns.length === 0) {
    // Get all keys from first product
    const keys = Object.keys(products[0])
      .filter((k) => !["id", "created_at", "updated_at"].includes(k))
      .map((k) => (k === "name" ? "product" : k));

    // ✅ Ensure all expected keys exist (even if missing in storage)
    const expectedKeys = ["product", "sku", "category", "stock", "price", "status", "added"];
    expectedKeys.forEach((k) => {
      if (!keys.includes(k)) keys.push(k);
    });

    setColumns(keys.map((k) => ({ name: k, visible: true })));
  }
}, [products]);


  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  function handleToggleVisibility(colName: string) {
    setColumns((cols) =>
      cols.map((c) =>
        c.name === colName ? { ...c, visible: !c.visible } : c
      )
    );
  }

  function handleResetColumns() {
    setColumns((cols) => cols.map((c) => ({ ...c, visible: true })));
  }

  function toggleSort(column: keyof Product) {
    setSortBy((s) => {
      if (s.column === column) {
        return { column, dir: s.dir === "asc" ? "desc" : "asc" };
      }
      return { column, dir: "asc" };
    });
  }

  function toggleSelectAll(checked: boolean) {
    if (checked) {
      const newSel: Record<string, boolean> = {};
      pageData.forEach((p) => (newSel[p.id] = true));
      setSelected((s) => ({ ...s, ...newSel }));
    } else {
      const clone = { ...selected };
      pageData.forEach((p) => delete clone[p.id]);
      setSelected(clone);
    }
  }

  function toggleSelectOne(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  function exportCSV() {
    const headers = [
      "id",
      "name",
      "sku",
      "category",
      "stock",
      "price",
      "status",
      "added",
    ];
    const rows = filtered.map((p) => [
      p.id,
      p.name,
      p.sku,
      p.category,
      String(p.stock),
      String(p.price),
      p.status,
      p.added,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearSelection() {
    setSelected({});
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 10);
    return () => clearTimeout(timer);
  }, [columns]);

  const selectedCount = Object.values(selected).filter(Boolean).length;
  

  return (
    <div className=" bg-gray-50 min-h-screen">
      <div className="mx-auto">
        <div className="flex flex-col flex-wrap md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-[24px] font-medium text-[#1D1F2C] ">Product</h2>
            <div className="flex ">
              <div className="text-sm text-[#2086BF]">Dashboard </div>
              <div>
                <i className="fi fi-rr-caret-right text-[#C2C6CE] w-[6px] h-[8px]"></i>
              </div>
              <div className="text-sm text-gray-500">Product List</div>
            </div>
          </div>

          <div className="flex items-center gap-2 py-[10px] px-[14px] rounded-lg">
            <button
              onClick={exportCSV}
              className="px-3 py-2 bg-[#EAF8FF] border rounded-md shadow-sm text-sm hover:bg-gray-50 flex gap-1"
            >
              <div>
                <i className="fi fi-rr-download size-5 text-[#2086BF]"></i>
              </div>
              <span className="text-[#2086BF]">Export</span>
            </button>
            <button
              onClick={() => router.push("/dashboard/product/create")}
              className="px-4 py-2 bg-[#2086BF] text-white rounded-md shadow hover:bg-blue-700 text-sm"
            >
              + Add Product
            </button>
          </div>
        </div>

        <div className="rounded-lg px-3 py-[6px] mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex items-center border border-[#E0E2E7] rounded-lg">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === "all"
                      ? "bg-[#EAF8FF] text-[#2086BF]"
                      : "bg-white text-[#667085]"
                  }`}
                >
                  All Products
                </button>
                <button
                  onClick={() => setActiveTab("published")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === "published"
                      ? "bg-[#EAF8FF] text-[#2086BF]"
                      : "bg-white text-[#667085]"
                  }`}
                >
                  Published
                </button>
                <button
                  onClick={() => setActiveTab("low")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === "low"
                      ? "bg-[#EAF8FF] text-[#2086BF]"
                      : "bg-white text-[#667085]"
                  }`}
                >
                  Low Stock
                </button>
                <button
                  onClick={() => setActiveTab("draft")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeTab === "draft"
                      ? "bg-[#EAF8FF] text-[#2086BF]"
                      : "bg-white text-[#667085]"
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>
            {/* <div className="flex items-center gap-3"> */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">

  {/* Search Bar */}
  <div className="flex items-center rounded-lg px-3 py-2 border border-[#E0E2E7] w-full md:w-auto">
    <i className="fi fi-rr-search mr-2 text-[#858D9D] flex items-center"></i>
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search product..."
      className="bg-transparent outline-none text-sm w-full md:w-64"
    />
  </div>

  {/* Group the remaining actions */}
  <div className="flex flex-row items-center gap-2 w-full md:w-auto">

    {/* Date Picker */}
    <div className="relative">
      <UniversalDatePicker
        onChange={onDateChange}
        placeholder="Select Dates"
        calendarPosition="right"
      />
    </div>

    {/* Filters */}
    <div className="relative">
      <button
        ref={filterBtnRef}
        onClick={() => setFilterModalOpen((s) => !s)}
        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-[#2086BF] hover:text-[#2086BF] transition-colors whitespace-nowrap"
      >
        <i className="fi fi-sr-settings-sliders text-sm"></i>
        <span>Filters</span>
        {(priceRange[0] > 0 || priceRange[1] < 10000 || priceSort) && (
          <span className="ml-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
            Active
          </span>
        )}
      </button>

      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        anchorRef={filterBtnRef}
        onApply={(min, max, sort) => {
          setPriceRange([min, max]);
          setPriceSort(sort || "");
          if (sort === "asc" || sort === "desc") {
            setSortBy({ column: "price", dir: sort });
          }
        }}
      />
    </div>

    {/* Edit Columns (hide on mobile) */}
    <button
      ref={btnRef}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const modalWidth = 320;
        const padding = 8;

        let left = rect.left;
        const top = rect.bottom + 6;

        if (left + modalWidth > window.innerWidth - padding)
          left = window.innerWidth - modalWidth - padding;

        if (left < padding) left = padding;

        setModalPos({ top, left });
        setColumnsModalOpen(true);
      }}
      className="hidden md:flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-[#2086BF] hover:text-[#2086BF] transition-colors"
    >
      <i className="fi fi-sr-layout-fluid text-sm"></i>
      <span className="whitespace-nowrap">Edit Columns</span>
    </button>

  </div>
</div>

          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="hidden md:block">
            <div className="flex items-center gap-2 px-4 py-3 border-b">
              <div className="w-12 flex items-center">
                <input
                  type="checkbox"
                  aria-label="select all"
                  checked={pageData.every((p) => selected[p.id]) && pageData.length > 0}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </div>

              {columns.find(c => c.name === "product")?.visible && (
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => toggleSort("name")}
                >
                  <div className="text-sm font-medium text-gray-600 flex items-center">
                    Product
                  </div>
                </div>
              )}

              {columns.find(c => c.name === "sku")?.visible && (
                <div className="w-24 text-sm font-medium text-gray-600 cursor-pointer" onClick={() => toggleSort("sku")}>
                  SKU
                </div>
              )}

              {/* {columns.find(c => c.name === "category")?.visible && (
                <div className="w-28 text-sm font-medium text-gray-600 cursor-pointer" onClick={() => toggleSort("category")}>
                  Category
                  <i className="fi fi-sr-caret-down text-[#858D9D] text-xs ml-2" />
                </div>
              )}

              {columns.find(c => c.name === "stock")?.visible && (
                <div className="w-20 text-sm font-medium text-gray-600 cursor-pointer" onClick={() => toggleSort("stock")}>
                  Stock
                  <i className="fi fi-sr-caret-down text-[#858D9D] text-xs ml-2" />
                </div>
              )}

              {columns.find(c => c.name === "price")?.visible && (
                <div className="w-28 text-sm font-medium text-gray-600 cursor-pointer" onClick={() => toggleSort("price")}>
                  Price
                  <i className="fi fi-sr-caret-down text-[#858D9D] text-xs ml-2" />
                </div>
              )} */}







{columns.find(c => c.name === "category")?.visible && (
  <div
    className="w-28 text-sm font-medium text-gray-600 cursor-pointer flex items-center"
    onClick={() => toggleSort("category")}
  >
    Category
    <i
      className={`fi ${
        sortBy.column === "category"
          ? sortBy.dir === "asc"
            ? "fi-sr-caret-up"
            : "fi-sr-caret-down"
          : "fi-sr-caret-down"
      } text-[#858D9D] text-xs ml-2 transition-transform duration-200`}
    />
  </div>
)}

{columns.find(c => c.name === "stock")?.visible && (
  <div
    className="w-20 text-sm font-medium text-gray-600 cursor-pointer flex items-center"
    onClick={() => toggleSort("stock")}
  >
    Stock
    <i
      className={`fi ${
        sortBy.column === "stock"
          ? sortBy.dir === "asc"
            ? "fi-sr-caret-up"
            : "fi-sr-caret-down"
          : "fi-sr-caret-down"
      } text-[#858D9D] text-xs ml-2 transition-transform duration-200`}
    />
  </div>
)}

{columns.find(c => c.name === "price")?.visible && (
  <div
    className="w-28 text-sm font-medium text-gray-600 cursor-pointer flex items-center"
    onClick={() => toggleSort("price")}
  >
    Price
    <i
      className={`fi ${
        sortBy.column === "price"
          ? sortBy.dir === "asc"
            ? "fi-sr-caret-up"
            : "fi-sr-caret-down"
          : "fi-sr-caret-down"
      } text-[#858D9D] text-xs ml-2 transition-transform duration-200`}
    />
  </div>
)}





              {columns.find(c => c.name === "status")?.visible && (
                <div className="w-28 text-sm font-medium text-gray-600">
                  Status
                </div>
              )}

              {columns.find(c => c.name === "added")?.visible && (
                <div className="w-36 text-sm font-medium text-gray-600">
                  Added
                </div>
              )}

              <div className="w-20 text-sm font-medium text-gray-600 text-right">
                Action
              </div>
            </div>

            {pageData.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2 px-4 py-3 border-b hover:bg-gray-50"
              >
                <div className="w-12">
                  <input
                    type="checkbox"
                    checked={!!selected[p.id]}
                    onChange={() => toggleSelectOne(p.id)}
                  />
                </div>

                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-800">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-500">{p.category}</div>
                </div>

                {columns.find(c => c.name === "sku")?.visible && (
                  <div className="w-24 text-sm text-[#2086BF]">{p.sku}</div>
                )}

                {columns.find(c => c.name === "category")?.visible && (
                  <div className="w-28 text-sm text-gray-700">{p.category}</div>
                )}

                {columns.find(c => c.name === "stock")?.visible && (
                  <div className="w-20 text-sm text-gray-700">{p.stock}</div>
                )}

                {columns.find(c => c.name === "price")?.visible && (
                  <div className="w-28 text-sm text-gray-700">${p.price}</div>
                )}

                {columns.find(c => c.name === "status")?.visible && (
                  <div className="w-28">
                    <StatusBadge status={p.status} />
                  </div>
                )}

                {columns.find(c => c.name === "added")?.visible && (
                  <div className="w-36 text-sm text-gray-700">{p.added}</div>
                )}

                <div className="w-20 text-right flex justify-end items-center gap-3">
                  <button
                    onClick={() => router.push(`/dashboard/product/create/${p.id}`)}
                    className="text-[#A3A9B6]"
                  >
                    <i className="fi fi-sr-pencil text-sm"></i>
                  </button>
                  <button className="text-[#A3A9B6]">
                    <i className="fi fi-sr-eye text-sm"></i>
                  </button>
                  {/* <button className="text-[#A3A9B6]">
                    <i className="fi fi-sr-trash text-sm"></i>
                  </button> */}

                  <button onClick={() => handleDelete(p.id)} className="text-[#A3A9B6]">
  <i className="fi fi-sr-trash text-sm"></i>
</button>

                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden p-4 space-y-3">
            {pageData.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-3 bg-white shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-gray-800">
                          {p.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {p.category} • SKU {p.sku}
                        </div>
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!selected[p.id]}
                          onChange={() => toggleSelectOne(p.id)}
                        />
                      </div> */}

                      <div className="flex items-center gap-2">
  {/* Action Buttons (Mobile Only) */}
  <div className="flex items-center gap-2">
    <button
      onClick={() => router.push(`/dashboard/product/create/${p.id}`)}
      className="text-[#A3A9B6]"
    >
      <i className="fi fi-sr-pencil text-xs"></i>
    </button>
    <button className="text-[#A3A9B6]">
      <i className="fi fi-sr-eye text-xs"></i>
    </button>
    <button className="text-[#A3A9B6]">
      <i className="fi fi-sr-trash text-xs"></i>
    </button>
  </div>

  {/* Checkbox */}
  <input
    type="checkbox"
    checked={!!selected[p.id]}
    onChange={() => toggleSelectOne(p.id)}
  />
</div>

                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm">
                        Stock: <span className="font-medium">{p.stock}</span>
                      </div>
                      <div className="text-sm">${p.price}</div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <StatusBadge status={p.status} />
                      <div className="text-xs text-gray-500">
                        Added: {p.added}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between flex-wrap md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium">{(page - 1) * pageSize + 1}</span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(page * pageSize, total)}
                </span>{" "}
                of <span className="font-medium">{total}</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                  className="px-2 py-1 border rounded-md text-sm"
                >
                  {PAGE_SIZE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s} / page
                    </option>
                  ))}
                </select>
              </div>

              <div className="ml-2">
                {selectedCount > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="text-sm">{selectedCount} selected</div>
                    <button
                      onClick={clearSelection}
                      className="text-sm text-blue-600"
                    >
                      Clear
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
                disabled={page === 1}
              >
                Prev
              </button>
              <div className="px-3 py-1 text-sm">
                {page} / {totalPages}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditColumnsModal
        isOpen={columnsModalOpen}
        onClose={() => setColumnsModalOpen(false)}
        anchorPos={modalPos}
        search={search}
        onSearchChange={setSearch}
        columns={columns}
        onToggleVisibility={handleToggleVisibility}
        onReset={handleResetColumns}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: ProductStatus }) {
  const mapping: Record<ProductStatus, { label: string; cls: string }> = {
    published: { label: "Published", cls: "bg-[#E9FAF7] text-[#1A9882]" },
    draft: { label: "Draft", cls: "bg-gray-100 text-gray-800" },
    low: { label: "Low Stock", cls: "bg-[#FFF0EA] text-[#F86624]" },
    out: { label: "Out of Stock", cls: "bg-red-100 text-[#EB3D4D]" },
  };
  const m = mapping[status];
  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${m?.cls}`}>
      {m?.label}
    </span>
  );
}
