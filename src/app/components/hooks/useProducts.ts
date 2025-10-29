import { useState, useMemo } from 'react'

interface Product {
  id: number
  name: string
  price: number
  category: string
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 699, category: 'Electronics' },
    { id: 3, name: 'Book', price: 20, category: 'Literature' },
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<keyof Product>('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    return result.sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [products, searchQuery, sortBy, sortOrder])

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { id: Date.now(), ...newProduct }])
  }

  const updateProduct = (id: number, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p))
    setEditingId(null)
    setEditForm(null)
  }

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const exportToCSV = () => {
    const csv = filteredProducts.map(p => `${p.name},${p.price},${p.category}`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'products.csv'
    a.click()
  }

  return {
    products: filteredProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    editingId,
    setEditingId,
    editForm,
    setEditForm,
    exportToCSV,
  }
}
