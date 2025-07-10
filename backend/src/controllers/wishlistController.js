const wishlistService = require('../services/wishlistService');
const { handleAsyncError } = require('../utils/errorHandler');

class WishlistController {
  getAllItems = handleAsyncError(async (req, res) => {
    const result = await wishlistService.getAllItems();
    res.json(result);
  });

  getItemById = handleAsyncError(async (req, res) => {
    const { id } = req.params;
    const result = await wishlistService.getItemById(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);
  });

  createItem = handleAsyncError(async (req, res) => {
    const result = await wishlistService.createItem(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json(result);
  });

  updateItem = handleAsyncError(async (req, res) => {
    const { id } = req.params;
    const result = await wishlistService.updateItem(id, req.body);

    if (!result.success) {
      const statusCode =
        result.message === 'Wishlist item not found' ? 404 : 400;
      return res.status(statusCode).json(result);
    }

    res.json(result);
  });

  deleteItem = handleAsyncError(async (req, res) => {
    const { id } = req.params;
    const result = await wishlistService.deleteItem(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);
  });

  toggleItemDone = handleAsyncError(async (req, res) => {
    const { id } = req.params;
    const result = await wishlistService.toggleItemDone(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);
  });
}

module.exports = new WishlistController();
