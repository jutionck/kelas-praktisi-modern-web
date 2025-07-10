import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import CurrencyInput from './CurrencyInput'
import { CATEGORIES, PRIORITIES } from '../constants'

const WishlistForm = ({ onSubmit, editingItem, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: 'General',
    priority: 'medium',
    done: false,
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || '',
        description: editingItem.description || '',
        price: editingItem.price || 0,
        category: editingItem.category || 'General',
        priority: editingItem.priority || 'medium',
        done: editingItem.done || false,
      })
    } else {
      setFormData({
        title: '',
        description: '',
        price: 0,
        category: 'General',
        priority: 'medium',
        done: false,
      })
    }
    setErrors({})
  }, [editingItem])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handlePriceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      price: value,
    }))

    if (errors.price) {
      setErrors((prev) => ({
        ...prev,
        price: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (formData.price && (isNaN(formData.price) || Number(formData.price) < 0)) {
      newErrors.price = 'Harga harus berupa angka positif yang valid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const submitData = {
      ...formData,
      price: Number(formData.price) || 0,
    }

    onSubmit(submitData)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="card border-0 shadow-none">
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          {editingItem ? 'Edit Wishlist Item' : 'Add New Wishlist Item'}
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pt-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter item title"
            className={`input-field ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter item description"
            rows={3}
            className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Harga (Rp)
            </label>
            <CurrencyInput
              value={formData.price}
              onChange={handlePriceChange}
              placeholder="Rp 0"
              error={errors.price}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="input-field"
            >
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority} className={getPriorityColor(priority)}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="flex items-center space-x-2 h-10">
              <input
                type="checkbox"
                id="done"
                name="done"
                checked={formData.done}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="done" className="text-sm text-gray-700">
                Mark as completed
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={onCancel} disabled={loading} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                {editingItem ? 'Updating...' : 'Adding...'}
              </>
            ) : editingItem ? (
              'Update Item'
            ) : (
              'Add Item'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default WishlistForm