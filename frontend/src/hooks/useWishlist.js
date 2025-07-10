import { useState, useEffect, useCallback } from 'react';
import wishlistService from '../services/wishlistService';
import { useDebounce } from './useDebounce';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchWishlistItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await wishlistService.getAllItems();
      setWishlistItems(result.data || []);
    } catch (err) {
      setError(err.userMessage || 'Failed to fetch wishlist items');
      console.error('Error fetching wishlist items:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addWishlistItem = useCallback(async (itemData) => {
    try {
      setError(null);
      const result = await wishlistService.createItem(itemData);
      if (result.success) {
        setWishlistItems(prev => [result.data, ...prev]);
        return { success: true, data: result.data };
      } else {
        setError(result.message || 'Failed to add item');
        return { success: false, error: result.message };
      }
    } catch (err) {
      const errorMessage = err.userMessage || 'Failed to add wishlist item';
      setError(errorMessage);
      console.error('Error adding wishlist item:', err);
      return { success: false, error: errorMessage };
    }
  }, []);

  const updateWishlistItem = useCallback(async (id, itemData) => {
    try {
      setError(null);
      const result = await wishlistService.updateItem(id, itemData);
      if (result.success) {
        setWishlistItems(prev =>
          prev.map(item => item.id === id ? result.data : item)
        );
        return { success: true, data: result.data };
      } else {
        setError(result.message || 'Failed to update item');
        return { success: false, error: result.message };
      }
    } catch (err) {
      const errorMessage = err.userMessage || 'Failed to update wishlist item';
      setError(errorMessage);
      console.error('Error updating wishlist item:', err);
      return { success: false, error: errorMessage };
    }
  }, []);

  const deleteWishlistItem = useCallback(async (id) => {
    try {
      setError(null);
      const result = await wishlistService.deleteItem(id);
      if (result.success) {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
        return { success: true };
      } else {
        setError(result.message || 'Failed to delete item');
        return { success: false, error: result.message };
      }
    } catch (err) {
      const errorMessage = err.userMessage || 'Failed to delete wishlist item';
      setError(errorMessage);
      console.error('Error deleting wishlist item:', err);
      return { success: false, error: errorMessage };
    }
  }, []);

  const toggleWishlistItemDone = useCallback(async (id) => {
    try {
      setError(null);
      const result = await wishlistService.toggleItemDone(id);
      if (result.success) {
        setWishlistItems(prev =>
          prev.map(item => item.id === id ? result.data : item)
        );
        return { success: true, data: result.data };
      } else {
        setError(result.message || 'Failed to toggle item status');
        return { success: false, error: result.message };
      }
    } catch (err) {
      const errorMessage = err.userMessage || 'Failed to toggle item status';
      setError(errorMessage);
      console.error('Error toggling wishlist item:', err);
      return { success: false, error: errorMessage };
    }
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setCategoryFilter('all');
    setPriorityFilter('all');
    setStatusFilter('all');
    setSortBy('newest');
  }, []);

  useEffect(() => {
    let filtered = [...wishlistItems];

    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(item => item.priority === priorityFilter);
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'done') {
        filtered = filtered.filter(item => item.done === true);
      } else if (statusFilter === 'pending') {
        filtered = filtered.filter(item => item.done === false);
      }
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  }, [wishlistItems, debouncedSearchTerm, categoryFilter, priorityFilter, statusFilter, sortBy]);

  useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  return {
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

    fetchWishlistItems,
    addWishlistItem,
    updateWishlistItem,
    deleteWishlistItem,
    toggleWishlistItemDone,
    clearFilters,

    hasActiveFilters: searchTerm || categoryFilter !== 'all' || priorityFilter !== 'all' || statusFilter !== 'all',
  };
};