const { v4: uuidv4 } = require('uuid');

class Database {
  constructor() {
    this.wishlistItems = [
      {
        id: uuidv4(),
        title: 'MacBook Pro',
        description: 'Latest MacBook Pro for development',
        price: 35000000,
        category: 'Electronics',
        priority: 'high',
        done: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Programming Books',
        description: 'Collection of JavaScript and React books',
        price: 750000,
        category: 'Books',
        priority: 'medium',
        done: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  getAllItems() {
    return [...this.wishlistItems];
  }

  getItemById(id) {
    return this.wishlistItems.find((item) => item.id === id);
  }

  createItem(itemData) {
    const newItem = {
      id: uuidv4(),
      ...itemData,
      createdAt: new Date().toISOString(),
    };
    this.wishlistItems.unshift(newItem);
    return newItem;
  }

  updateItem(id, updateData) {
    const itemIndex = this.wishlistItems.findIndex((item) => item.id === id);
    if (itemIndex === -1) return null;

    this.wishlistItems[itemIndex] = {
      ...this.wishlistItems[itemIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    return this.wishlistItems[itemIndex];
  }

  deleteItem(id) {
    const itemIndex = this.wishlistItems.findIndex((item) => item.id === id);
    if (itemIndex === -1) return null;

    const deletedItem = this.wishlistItems.splice(itemIndex, 1)[0];
    return deletedItem;
  }

  toggleItemDone(id) {
    const item = this.getItemById(id);
    if (!item) return null;

    return this.updateItem(id, { done: !item.done });
  }
}

module.exports = new Database();
