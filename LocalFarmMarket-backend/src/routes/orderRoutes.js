import express from 'express';
const router = express.Router();
import {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
  getOrderById,
  removeOrder,
  createPayment,
} from '../controllers/orderController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validateOrderDTO } from '../middleware/orderValidation.js'; // Add this import

// Buyer routes
router.post(
  '/',
  protect,
  authorizeRoles('buyer'),
  validateOrderDTO, // Add the validation middleware
  createOrder
);

router.delete('/:id', protect, authorizeRoles('buyer'), removeOrder); 
router.get('/', protect, authorizeRoles('buyer'), getMyOrders);
router.post('/payment', protect, createPayment);
router.get('/:id', protect, getOrderById);
// Seller routes
router.get('/seller/orders', protect, authorizeRoles('seller'), getSellerOrders);
router.put(
  '/:id/status',
  protect,
  authorizeRoles('seller'),
  updateOrderStatus
);

export default router;