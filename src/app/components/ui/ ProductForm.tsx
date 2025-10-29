'use client'
import { useState } from 'react'

// ✅ Add this interface (this removes the red lines)
interface Product {
  id?: string | number
  name: string
  price: number
  category: string
}

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id'> | Product) => void
  initialData?: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductForm({
  onSubmit,
  initialData,
  isOpen,
  onClose
}: ProductFormProps) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    price: 0,
    category: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Add/Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: +e.target.value })}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
