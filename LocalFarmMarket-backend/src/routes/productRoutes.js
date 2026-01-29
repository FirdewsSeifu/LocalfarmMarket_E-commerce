import express from 'express';
import {
  getAllProducts,
  getSellerProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  addReview,
  seedProducts
} from '../controllers/productController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductDetails);
router.post('/:id/reviews', protect, addReview);

// Seller protected routes
router.get('/seller/products', protect, authorizeRoles('seller'), getSellerProducts);
router.post('/seller/products', protect, authorizeRoles('seller'), createProduct);
router.put('/seller/products/:id', protect, authorizeRoles('seller'), updateProduct);
router.delete('/seller/products/:id', protect, authorizeRoles('seller'), deleteProduct);



// Dev only
router.post('/seed', seedProducts);

export default router;