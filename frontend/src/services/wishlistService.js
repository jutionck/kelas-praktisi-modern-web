import apiClient from './apiClient';

class WishlistService {
  async getAllItems() {
    const response = await apiClient.get('/wishlist');
    return response.data;
  }

  async getItemById(id) {
    const response = await apiClient.get(`/wishlist/${id}`);
    return response.data;
  }

  async createItem(itemData) {
    const response = await apiClient.post('/wishlist', itemData);
    return response.data;
  }

  async updateItem(id, itemData) {
    const response = await apiClient.put(`/wishlist/${id}`, itemData);
    return response.data;
  }

  async deleteItem(id) {
    const response = await apiClient.delete(`/wishlist/${id}`);
    return response.data;
  }

  async toggleItemDone(id) {
    const response = await apiClient.patch(`/wishlist/${id}/toggle`);
    return response.data;
  }
}

export default new WishlistService();