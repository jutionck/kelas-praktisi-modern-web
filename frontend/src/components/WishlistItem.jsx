import { useState } from 'react'
import { Edit2, Trash2, DollarSign, Calendar, Tag, AlertCircle, Check, RotateCcw } from 'lucide-react'
import { formatCurrency } from '../utils/currency'

const WishlistItem = ({ item, onEdit, onDelete, onToggleDone, loading }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(item.id)
    setIsDeleting(false)
    setShowConfirm(false)
  }

  const handleToggleDone = async () => {
    setIsToggling(true)
    await onToggleDone(item.id)
    setIsToggling(false)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return '🔴'
      case 'medium':
        return '🟡'
      case 'low':
        return '🟢'
      default:
        return '⚪'
    }
  }

  const formatPrice = (price) => {
    return formatCurrency(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className={`card group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-gray-300 ${item.done ? 'opacity-75 bg-gray-50' : ''}`}>
      <div className="pb-3 border-b border-gray-100 mb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`text-lg font-semibold mb-1 line-clamp-2 ${item.done ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {item.title}
              </h3>
              {item.done && (
                <div className="flex-shrink-0">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
              )}
            </div>
            <p className={`text-sm line-clamp-2 mb-3 ${item.done ? 'text-gray-500' : 'text-gray-600'}`}>
              {item.description}
            </p>
          </div>

          <div className="ml-3 flex-shrink-0 flex flex-col gap-2">
            {item.done && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                ✅ Done
              </span>
            )}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}
            >
              <span className="mr-1">{getPriorityIcon(item.priority)}</span>
              {item.priority}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-1" />
            Harga:
          </div>
          <span className="font-semibold text-gray-900">
            {item.price > 0 ? formatPrice(item.price) : 'Belum ditentukan'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Tag className="w-4 h-4 mr-1" />
            Category:
          </div>
          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">{item.category}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            {item.updatedAt ? 'Updated:' : 'Added:'}
          </div>
          <span className="text-sm text-gray-600">{formatDate(item.updatedAt || item.createdAt)}</span>
        </div>
      </div>

      <div className="flex space-x-2 pt-3 border-t border-gray-100">
        <button
          onClick={handleToggleDone}
          disabled={loading || isToggling}
          className={`flex-1 btn-secondary text-sm ${
            item.done 
              ? 'hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-300' 
              : 'hover:bg-green-50 hover:text-green-700 hover:border-green-300'
          }`}
        >
          {isToggling ? (
            <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-1"></span>
          ) : item.done ? (
            <RotateCcw className="w-4 h-4 mr-1" />
          ) : (
            <Check className="w-4 h-4 mr-1" />
          )}
          {item.done ? 'Undo' : 'Done'}
        </button>

        <button
          onClick={() => onEdit(item)}
          disabled={loading}
          className="flex-1 btn-secondary text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
        >
          <Edit2 className="w-4 h-4 mr-1" />
          Edit
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          disabled={loading || isDeleting}
          className="flex-1 btn-secondary text-sm hover:bg-red-50 hover:text-red-700 hover:border-red-300"
        >
          {isDeleting ? (
            <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-1"></span>
          ) : (
            <Trash2 className="w-4 h-4 mr-1" />
          )}
          Delete
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              <h3 className="text-lg font-semibold">Delete Wishlist Item</h3>
            </div>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete "{item.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowConfirm(false)} className="btn-secondary" disabled={isDeleting}>
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></span>
                ) : (
                  'Delete Item'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WishlistItem