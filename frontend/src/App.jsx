import { useState } from 'react'
import Header from './components/Header'
import WishlistForm from './components/WishlistForm'
import WishlistItem from './components/WishlistItem'
import { Search, Filter, Plus } from 'lucide-react'
import { useWishlist } from './hooks/useWishlist'
import { CATEGORIES, PRIORITIES, SORT_OPTIONS, STATUS_FILTERS } from './constants'
import './index.css'

function App() {
  const [editingItem, setEditingItem] = useState(null)
  const [showForm, setShowForm] = useState(false)
  
  const {
    wishlistItems,
    filteredItems,
    loading,
    error,
    searchTerm,
    categoryFilter,
    priorityFilter,
    statusFilter,
    sortBy,
    setSearchTerm,
    setCategoryFilter,
    setPriorityFilter,
    setStatusFilter,
    setSortBy,
    addWishlistItem,
    updateWishlistItem,
    deleteWishlistItem,
    toggleWishlistItemDone,
    clearFilters,
    hasActiveFilters,
  } = useWishlist()

  const handleFormSubmit = async (itemData) => {
    const result = editingItem 
      ? await updateWishlistItem(editingItem.id, itemData)
      : await addWishlistItem(itemData)
    
    if (result.success) {
      setEditingItem(null)
      setShowForm(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setShowForm(true)
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
              <p className="text-gray-600">
                {filteredItems.length} of {wishlistItems.length} items
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="ml-2 text-blue-600 hover:text-blue-800 text-sm">
                    Clear filters
                  </button>
                )}
              </p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-primary flex items-center" disabled={loading}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              <div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Priorities</option>
                  {PRIORITIES.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field"
                >
                  {STATUS_FILTERS.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field">
                  {SORT_OPTIONS.map((sort) => (
                    <option key={sort.value} value={sort.value}>
                      {sort.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <WishlistForm
                  onSubmit={handleFormSubmit}
                  editingItem={editingItem}
                  onCancel={handleCancelEdit}
                  loading={loading}
                />
              </div>
            </div>
          )}

          <div className="space-y-6">
            {loading && !showForm ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading wishlist items...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {wishlistItems.length === 0 ? 'Your wishlist is empty' : 'No items match your filters'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {wishlistItems.length === 0
                      ? 'Add your first item to get started!'
                      : 'Try adjusting your search or filter criteria.'}
                  </p>
                  {wishlistItems.length === 0 ? (
                    <button onClick={() => setShowForm(true)} className="btn-primary flex items-center mx-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Item
                    </button>
                  ) : (
                    <button onClick={clearFilters} className="btn-secondary">
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <WishlistItem
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={(id) => deleteWishlistItem(id)}
                    onToggleDone={(id) => toggleWishlistItemDone(id)}
                    loading={loading}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App