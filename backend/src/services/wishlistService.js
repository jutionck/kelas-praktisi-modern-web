const database = require('../config/database');
const WishlistItem = require('../models/WishlistItem');

class WishlistService {
  async getAllItems() {
    try {
      const items = database.getAllItems();
      return {
        success: true,
        data: items,
        count: items.length,
      };
    } catch (error) {
      throw new Error(`Failed to fetch wishlist items: ${error.message}`);
    }
  }

  async getItemById(id) {
    try {
      if (!id) {
        throw new Error('Item ID is required');
      }

      const item = database.getItemById(id);
      if (!item) {
        return {
          success: false,
          message: 'Wishlist item not found',
        };
      }

      return {
        success: true,
        data: item,
      };
    } catch (error) {
      throw new Error(`Failed to fetch wishlist item: ${error.message}`);
    }
  }

  async createItem(itemData) {
    try {
      const validation = WishlistItem.validate(itemData);
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        };
      }

      const sanitizedData = WishlistItem.sanitize(itemData);

      const newItem = database.createItem(sanitizedData);

      return {
        success: true,
        data: newItem,
        message: 'Wishlist item created successfully',
      };
    } catch (error) {
      throw new Error(`Failed to create wishlist item: ${error.message}`);
    }
  }

  async updateItem(id, updateData) {
    try {
      if (!id) {
        throw new Error('Item ID is required');
      }

      const existingItem = database.getItemById(id);
      if (!existingItem) {
        return {
          success: false,
          message: 'Wishlist item not found',
        };
      }

      const validation = WishlistItem.validate({
        ...existingItem,
        ...updateData,
      });
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        };
      }

      const sanitizedData = WishlistItem.sanitize(updateData);

      const updatedItem = database.updateItem(id, sanitizedData);

      return {
        success: true,
        data: updatedItem,
        message: 'Wishlist item updated successfully',
      };
    } catch (error) {
      throw new Error(`Failed to update wishlist item: ${error.message}`);
    }
  }

  async deleteItem(id) {
    try {
      if (!id) {
        throw new Error('Item ID is required');
      }

      const deletedItem = database.deleteItem(id);
      if (!deletedItem) {
        return {
          success: false,
          message: 'Wishlist item not found',
        };
      }

      return {
        success: true,
        data: deletedItem,
        message: 'Wishlist item deleted successfully',
      };
    } catch (error) {
      throw new Error(`Failed to delete wishlist item: ${error.message}`);
    }
  }

  async toggleItemDone(id) {
    try {
      if (!id) {
        throw new Error('Item ID is required');
      }

      const item = database.getItemById(id);
      if (!item) {
        return {
          success: false,
          message: 'Wishlist item not found',
        };
      }

      const updatedItem = database.toggleItemDone(id);

      return {
        success: true,
        data: updatedItem,
        message: `Wishlist item marked as ${
          updatedItem.done ? 'completed' : 'pending'
        }`,
      };
    } catch (error) {
      throw new Error(
        `Failed to toggle wishlist item status: ${error.message}`
      );
    }
  }
}

module.exports = new WishlistService();
