const { parseCurrency, validateCurrency } = require('../utils/currency');

class WishlistItem {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.price =
      typeof data.price === 'string'
        ? parseCurrency(data.price)
        : data.price || 0;
    this.category = data.category || 'General';
    this.priority = data.priority || 'medium';
    this.done = data.done || false;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static validate(data) {
    const errors = {};

    if (
      !data.title ||
      typeof data.title !== 'string' ||
      data.title.trim().length === 0
    ) {
      errors.title = 'Title is required and must be a non-empty string';
    }

    if (
      !data.description ||
      typeof data.description !== 'string' ||
      data.description.trim().length === 0
    ) {
      errors.description =
        'Description is required and must be a non-empty string';
    }

    if (data.price !== undefined) {
      const currencyValidation = validateCurrency(data.price);
      if (!currencyValidation.isValid) {
        errors.price = currencyValidation.error;
      }
    }

    const validCategories = [
      'General',
      'Electronics',
      'Books',
      'Clothing',
      'Sports',
      'Home',
      'Other',
    ];
    if (data.category && !validCategories.includes(data.category)) {
      errors.category = `Category must be one of: ${validCategories.join(
        ', '
      )}`;
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (data.priority && !validPriorities.includes(data.priority)) {
      errors.priority = `Priority must be one of: ${validPriorities.join(
        ', '
      )}`;
    }

    if (data.done !== undefined && typeof data.done !== 'boolean') {
      errors.done = 'Done status must be a boolean value';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  static sanitize(data) {
    return {
      title: data.title?.trim(),
      description: data.description?.trim(),
      price: data.price ? parseCurrency(data.price) : 0,
      category: data.category || 'General',
      priority: data.priority || 'medium',
      done: Boolean(data.done),
    };
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      category: this.category,
      priority: this.priority,
      done: this.done,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = WishlistItem;
