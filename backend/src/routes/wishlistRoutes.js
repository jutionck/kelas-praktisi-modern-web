const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const { createRateLimit } = require('../middleware/validation');

const router = express.Router();

router.use(createRateLimit(15 * 60 * 1000, 100));

router.get('/', wishlistController.getAllItems);
router.get('/:id', wishlistController.getItemById);
router.post('/', wishlistController.createItem);
router.put('/:id', wishlistController.updateItem);
router.delete('/:id', wishlistController.deleteItem);
router.patch('/:id/toggle', wishlistController.toggleItemDone);

module.exports = router;
