



"use client";

import { useEffect, useState, useRef } from "react";
import { mockProducts } from "../../components/ProductTable"; // Adjust path if files are in different folders, e.g., "@/app/components/ProductTable"

type ProductFormProps = {
  mode: "create" | "edit";
  id?: string;
};

type PricingState = {
  basePrice: string;
  stock: string;
  discountType: string;
  discountPercentage: string;
};

type Variant = {
  type: string;
  value: string;
};

type ProductState = {
  name: string;
  description: string;
  category: string;
  tags: string;
  status: string;
  pricing: PricingState;
  variations: Variant[];
};

type MockProduct = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: "published" | "draft" | "low" | "out";
  added: string;
};

export default function ProductForm({ mode, id }: ProductFormProps) {
  const isEdit = mode === "edit";
  const descriptionRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<ProductState>({
    name: "",
    description: "",
    category: "",
    tags: "",
    status: "Draft",
    pricing: {
      basePrice: "",
      stock: "",
      discountType: "No Discount",
      discountPercentage: "0",
    },
    variations: [{ type: "", value: "" }],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>(["", "", ""]);

useEffect(() => {
  if (!isEdit || !id) return;

  const saved = JSON.parse(localStorage.getItem("mockProducts") || "[]");
  const merged = [...mockProducts, ...saved];

  // ensure unique by id (localStorage entries override mock)
  const products = Array.from(
    new Map(merged.map((p) => [p.id, p])).values()
  );

  const product = products.find((p) => p.id === id);
  if (!product) return;

  setForm({
    name: product.name ?? "",
    category: product.category ?? "",
    tags: product.sku ?? "",
    status: product.status ?? "draft", // ✅ SAFE STATUS
    description: product.description ?? "",
    pricing: {
      basePrice: product.price?.toString() ?? "0",
      stock: product.stock?.toString() ?? "0",
    },
    variations: product.variations && product.variations.length > 0
      ? product.variations
      : [{ type: "", value: "" }],
  });
}, [isEdit, id]);



  const handleInputChange = (
    field: keyof ProductState,
    value: string,
    subField?: keyof PricingState | number
  ) => {
    if (subField !== undefined) {
      if (typeof subField === "number" && field === "variations") {
        // For variations remove
        setForm((prev) => ({
          ...prev,
          variations: prev.variations.filter((_, i) => i !== subField),
        }));
        return;
      }
      // For pricing
      setForm((prev) => ({
        ...prev,
        pricing: { ...prev.pricing, [subField as keyof PricingState]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handlePricingChange = (
    subField: keyof PricingState,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, [subField]: value },
    }));
  };

  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variations: [...prev.variations, { type: "", value: "" }],
    }));
  };

  const removeVariant = (index: number) => {
    setForm((prev) => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index),
    }));
  };

  const updateVariant = (index: number, field: keyof Variant, value: string) => {
    setForm((prev) => ({
      ...prev,
      variations: prev.variations.map((v, i) =>
        i === index ? { ...v, [field]: value } : v
      ),
    }));
  };

  const handleDescriptionChange = () => {
    if (descriptionRef.current) {
      handleInputChange("description", descriptionRef.current.innerHTML);
    }
  };

 
  // Rich text formatting functions
  const applyFormat = (command: string, value?: string) => {
    if (descriptionRef.current) {
      descriptionRef.current.focus();
      document.execCommand(command, false, value);
      handleDescriptionChange();
    }
  };

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Set initial content only once when editing an existing product
    if (descriptionRef.current && !hasMounted) {
      descriptionRef.current.innerHTML = form.description;
      setHasMounted(true);
    }
  }, [hasMounted, form.description]);

  // Update the handleImageClick to be reusable for the button too
  const handleImageClick = (index?: number) => {
    const targetIndex = index ?? imagePreviews.findIndex((preview) => !preview); // If no index, find first empty slot
    if (targetIndex === -1) return; // No empty slots

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPreviews = [...imagePreviews];
          newPreviews[targetIndex] = e.target?.result as string;
          setImagePreviews(newPreviews);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };


//   const handleSubmit = () => {
//   // Create product structure consistent with table
//   const newProduct: MockProduct = {
//     id: crypto.randomUUID(), // unique id
//     name: form.name,
//     sku: form.tags || "SKU-" + Math.floor(Math.random() * 10000),
//     category: form.category,
//     stock: Number(form.pricing.stock) || 0,
//     price: Number(form.pricing.basePrice) || 0,
//     status:
//       form.status.toLowerCase().replace(/\s+/g, "") as
//         "published" | "draft" | "low" | "out",
//     added: new Date().toISOString(),
//   };

//   const existing = JSON.parse(localStorage.getItem("mockProducts") || "[]");
// localStorage.setItem("mockProducts", JSON.stringify([newProduct, ...existing]));


//   // UI feedback
//   alert("✅ Product added successfully!");

//   // Redirect / Close form
//   history.back();
// };
// const handleSubmit = () => {
//   const productData: MockProduct = {
//     id: isEdit && id ? id : crypto.randomUUID(), // same ID if editing
//     name: form.name,
//     sku: form.tags || "SKU-" + Math.floor(Math.random() * 10000),
//     category: form.category,
//     stock: Number(form.pricing.stock) || 0,
//     price: Number(form.pricing.basePrice) || 0,
//     // status: statusMap[form.status] ?? "draft",
//     added: new Date().toISOString(),
//   };

//   const existing: MockProduct[] = JSON.parse(
//     localStorage.getItem("mockProducts") || "[]"
//   );

//   if (isEdit) {
//     // ✅ EDIT MODE: replace product with same ID
//     const updated = existing.map((p) =>
//       p.id === productData.id ? productData : p
//     );
//     localStorage.setItem("mockProducts", JSON.stringify(updated));
//     alert("✅ Product updated successfully!");
//   } else {
//     // ✅ ADD MODE: append new product (so it does not override mockProducts[0])
//     const updated = [...existing, productData];
//     localStorage.setItem("mockProducts", JSON.stringify(updated));
//     alert("✅ Product added successfully!");
//   }

//   history.back();
// };


const handleSubmit = () => {
  const productData: MockProduct = {
    id: isEdit && id ? id : crypto.randomUUID(),
    name: form.name,
    sku: form.tags || "SKU-" + Math.floor(Math.random() * 10000),
    category: form.category,
    stock: Number(form.pricing.stock) || 0,
    price: Number(form.pricing.basePrice) || 0,
    status: form.status.toLowerCase().replace(/\s+/g, "") as
      "published" | "draft" | "low" | "out",
    // added: new Date().toISOString(),
    added: new Date().toISOString().split("T")[0],

  };

  const saved = JSON.parse(localStorage.getItem("mockProducts") || "[]");

  // ✅ Merge mockProducts + saved (so saved overrides mock)
  const merged = [...mockProducts, ...saved];
  const unique = Array.from(new Map(merged.map(p => [p.id, p])).values());

  let updated;

  if (isEdit) {
    // ✅ EDIT — replace in merged list
    updated = unique.map((p) => (p.id === productData.id ? productData : p));
    alert("✅ Product updated successfully!");
  } else {
    // ✅ ADD — add on top
    updated = [productData, ...unique];
    alert("✅ Product added successfully!");
  }

  // ✅ Save final unique list to localStorage
  localStorage.setItem("mockProducts", JSON.stringify(updated));

  history.back();
};

 useEffect(() => {
    const vp = document.querySelector('meta[name=viewport]');
    if (vp) {
      vp.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      );
    }

    // Remove ANY auto-focus Safari tries to do
    document.activeElement instanceof HTMLElement && document.activeElement.blur();
  }, []);


  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-2xl font-semibold">
          {isEdit ? "Edit Product" : "Create Product"}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        {/* Breadcrumb */}
        <p className="text-lg text-gray-500 flex items-center gap-x-4">
          <span className="text-[#2086BF]">Dashboard</span>
          <i className="fi-sr-caret-right text-xs"></i>
          <span className="text-[#2086BF]">Product List</span>
          <i className="fi-sr-caret-right text-xs"></i>
          <span>{isEdit ? "Edit Product" : "Add Product"}</span>
        </p>

        {/* Buttons Right Aligned */}
        {/* <div className="flex gap-4">*/}
        <div className="flex gap-4 md:justify-end">
 
          <button
            onClick={() => history.back()}
            className="flex items-center gap-2 border border-gray-400 px-4 h-10 rounded-md text-sm"
          >
            <i className="fi-sr-cross text-sm"></i>
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 h-10 bg-[#2086BF] text-white rounded-md shadow hover:bg-blue-700 text-sm"
          >
            <i className="fi-sr-disk text-sm"></i>
            {isEdit ? "Save Product" : "Add Product"}
          </button>
        </div>
      </div>

      {/* Main Form: Full width container with flex for 3/4 left and 1/4 right on md+ */}
      <div className="flex flex-col md:flex-row w-full gap-6">
        {/* Left: General Information - 3/4 width on md+ */}
        <div className="md:w-3/4 bg-white">


        <div className="bg-white rounded-[12px] p-6 shadow-[0_4px_30px_0_#2E2D740D]">
           <h3 className="text-lg font-medium mb-4 text-gray-900  p-3 rounded-md">
            General Information
          </h3>

          {/* Product Name */}
          <div className="mb-6 p-3  rounded-md">
            <label className="block text-sm font-medium text-[#777980] mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2086BF] focus:border-transparent"
              placeholder="Product Name"
            />
          </div>

          {/* Description with Rich Text Toolbar */}
          <div className="mb-6 p-3 bg-white rounded-md">
            <label className="block text-sm font-medium text-[#777980] mb-2">
              Description
            </label>

            {/* Toolbar for B/I/U and other icons */}
            <div className="flex flex-wrap gap-1 mb-2 p-1 bg-gray-100 rounded-md border border-[#E0E2E7]">
              <button
                type="button"
                onClick={() => applyFormat("bold")}
                className="p-1 text-sm hover:bg-gray-200 rounded"
                title="Bold"
              >
                <i className="fi fi-rr-bold size-[13px] text-[#475569] "></i>
              </button>
              <button
                type="button"
                onClick={() => applyFormat("italic")}
                className="p-1 text-sm hover:bg-gray-200 rounded"
                title="Italic"
              >
                <i className="fi fi-rr-italic size-[13px] text-[#475569]"></i>
              </button>
              <button
                type="button"
                onClick={() => applyFormat("underline")}
                className="p-1 text-sm hover:bg-gray-200 rounded"
                title="Underline"
              >
                <i className="fi fi-rr-underline size-[13px] text-[#475569]"></i>
              </button>
              <select
                onChange={(e) => applyFormat("fontSize", e.target.value)}
                className="p-1 text-sm hover:bg-gray-200 rounded"
                title="Text Size"
              >
                <option value="3">12</option>
                <option value="1">8</option>
                <option value="2">10</option>
                <option value="3">12</option>
                <option value="4">14</option>
                <option value="5">18</option>
                <option value="6">24</option>
                <option value="7">36</option>
              </select>
              <button
                type="button"
                onClick={() => applyFormat("justifyLeft")}
                className="p-1 text-sm hover:bg-gray-200 rounded"
                title="Align Left"
              >
                <i className="fi-sr-align-left"></i>
              </button>
              <button
                type="button"
                onClick={() => applyFormat("justifyCenter")}
                className="p-1 text-sm hover:bg-gray-200 rounded"
                title="Align Center"
              >
                <i className="fi-sr-align-center"></i>
              </button>
              <button
                type="button"
                onClick={() => applyFormat("justifyRight")}
                className="p-1 text-sm hover:bg-gray-200 rounded"
                title="Align Right"
              >
                <i className="fi fi-rr-symbol"></i>
              </button>
              <button
                type="button"
                onClick={() => applyFormat("insertUnorderedList")}
                className="p-1 text-sm hover:bg-gray-200 rounded"
                title="Bullet List"
              >
                <i className="fi-sr-list"></i>
              </button>
              <button
                type="button"
                onClick={() => applyFormat("insertOrderedList")}
                className="p-1 text-sm hover:bg-gray-200 rounded"
                title="Numbered List"
              >
                <i className="fi-sr-list-numbers"></i>
              </button>
            </div>

            {/* Contenteditable div for rich text description */}
            <div
              ref={descriptionRef}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                handleInputChange("description", e.currentTarget.innerHTML)
              }
              className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md 
             focus:outline-none focus:ring-2 focus:ring-[#2086BF] focus:border-transparent"
            />
          </div>
        </div>
         

          {/* Media Section - Below Description in left column */}
          <div className="my-6  bg-white  rounded-[12px] p-6 shadow-[0_4px_30px_0_#2E2D740D]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo
            </label>
            <div className="border border-gray-300 rounded-md p-4 bg-white">
              <div className="flex space-x-4 mb-4 justify-center">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className={`w-[100px] h-[100px] border-2 border-dashed ${
                      imagePreviews[index]
                        ? "border-gray-300"
                        : index === 0
                        ? "border-[#2086BF]"
                        : "border-gray-300"
                    } rounded-lg flex items-center justify-center cursor-pointer hover:border-[#2086BF] transition-colors relative ${
                      imagePreviews[index] ? "bg-gray-50" : "bg-[#E0E2E7]"
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    {imagePreviews[index] ? (
                      <img
                        src={imagePreviews[index]}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    )}
                    {/* Green checkmark for non-first empty slots, to match the screenshot vibe */}
                    {!imagePreviews[index] && index > 0 && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center mb-3">
                Drag and drop image, or click to add
              </p>
              <div className="flex justify-center mb-2">
                <button
                  onClick={() => handleImageClick()}
                  className="px-4 py-2 bg-[#2086BF] text-white text-sm font-medium rounded-md hover:bg-blue-500 transition-colors"
                >
                  Add Image
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center">72 x 72 px</p>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="my-6  bg-white  rounded-[12px] p-6 shadow-[0_4px_30px_0_#2E2D740D]">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Pricing</h4>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-xs font-medium text-[#777980] mb-1">Base Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={form.pricing.basePrice}
                    onChange={(e) => handlePricingChange("basePrice", e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2086BF] focus:border-transparent text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#777980] mb-1">Stock</label>
                <input
                  type="number"
                  value={form.pricing.stock}
                  onChange={(e) => handlePricingChange("stock", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2086BF] focus:border-transparent text-sm"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-[#777980] mb-1">Discount Type</label>
                <select
                  value={form.pricing.discountType}
                  onChange={(e) => handlePricingChange("discountType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2086BF] focus:border-transparent text-sm"
                >
                  <option value="No Discount">No Discount</option>
                  <option value="Fixed Amount">Fixed Amount</option>
                  <option value="Percentage">Percentage</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#777980] mb-1">Discount Percentage (%)</label>
                
                <input
  type="number"
  value={form?.pricing?.discountPercentage ?? ""}
  onChange={(e) => handlePricingChange("discountPercentage", e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2086BF] focus:border-transparent text-sm"
                  placeholder="0"
/>

              </div>
            </div>
          </div>

          {/* Variation Section */}
          <div className="p-3 bg-white rounded-md">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Variation</h4>
            <div className="space-y-3 mb-4">
              {form.variations.map((variant, index) => (
                <div key={index} className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-[#777980] mb-1">Variation Type</label>
                    <select
                      value={variant.type}
                      onChange={(e) => updateVariant(index, "type", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2086BF] focus:border-transparent text-sm"
                    >
                      <option value="">Select Type</option>
                      <option value="Color">Color</option>
                      <option value="Size">Size</option>
                      <option value="Material">Material</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-[#777980] mb-1">Variation</label>
                    <select
                      value={variant.value}
                      onChange={(e) => updateVariant(index, "value", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2086BF] focus:border-transparent text-sm"
                    >
                      <option value="">Select Variation</option>
                      <option value="Black">Black</option>
                      <option value="Gray">Gray</option>
                      <option value="Blue">Blue</option>
                      <option value="Red">Red</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>
                  {form.variations.length > 1 && (
                    <button
                      onClick={() => removeVariant(index)}
                      className="w-6 h-6 bg-pink-100 hover:bg-pink-200 rounded-full flex items-center justify-center text-pink-500 text-xs font-medium transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addVariant}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#2086BF] border border-[#2086BF] rounded-md hover:bg-[#2086BF] hover:text-white transition-colors"
            >
              <span className="text-xs">+</span> Add Variant
            </button>
          </div>
        </div>

        {/* Right: Category, Tags, Status - 1/4 width on md+, full on mobile (stacks below) */}
        <div className="md:w-1/4 space-y-6">
          <h3 className="text-lg font-medium mb-4 text-gray-900">Category</h3>

          {/* Category */}
          <div className="p-3 bg-white rounded-md">
            <label className="block text-sm font-medium text-[#777980] mb-2">
              Product Category
            </label>
            <select
              value={form.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2086BF] focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="Watch">Watch</option>
              <option value="Electronics">Electronics</option>
              <option value="Fitness">Fitness</option>
              <option value="Bags & Pouch">Bags & Pouch</option>
              <option value="Audio">Audio</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Shoes">Shoes</option>
              <option value="Mouse">Mouse</option>
              <option value="Toys">Toys</option>
              <option value="Beauty">Beauty</option>
            </select>
          </div>

          {/* Tags */}
          <div className="p-3 bg-white rounded-md">
            <label className="block text-sm font-medium text-[#777980] mb-2">
              Product Tags
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2086BF] focus:border-transparent"
              placeholder="Enter tags (comma-separated)"
            />
          </div>

          {/* Status */}
          <div className="p-3 bg-white rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2086BF] focus:border-transparent"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
