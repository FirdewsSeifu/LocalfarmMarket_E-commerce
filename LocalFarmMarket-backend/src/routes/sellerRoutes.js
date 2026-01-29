import express from 'express';
import {
  getDashboardStats,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getAllUsers,
  deleteUser,
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  createUser
} from '../controllers/sellerController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Event from '../models/Event.js';
import Blog from '../models/Blog.js';

const router = express.Router();

// Dashboard
router.get('/dashboard-stats', protect, authorizeRoles('seller'), getDashboardStats);

// Products
router.route('/products')
  .get(protect, authorizeRoles('seller'), getAllProducts)
  .post(protect, authorizeRoles('seller'), createProduct);

router.route('/products/:id')
  .put(protect, authorizeRoles('seller'), updateProduct)
  .delete(protect, authorizeRoles('seller'), deleteProduct);

// Orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.route('/orders/:id')
  .put(protect, authorizeRoles('seller'), updateOrderStatus)
  .delete(protect, authorizeRoles('seller'), deleteOrder);

// Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/users', protect, authorizeRoles('seller'), createUser);
router.delete('/users/:id', protect, authorizeRoles('seller'), deleteUser);

// Events
router.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.route('/events')
  .post(protect, authorizeRoles('seller'), createEvent);

router.route('/events/:id')
  .put(protect, authorizeRoles('seller'), updateEvent)
  .delete(protect, authorizeRoles('seller'), deleteEvent);

// Blogs
router.route('/blogs')
  .post(protect, authorizeRoles('seller'), createBlog);
  router.get('/blogs', async (req, res) => {
      try {
          const blogs = await Blog.find();
          res.json(blogs);
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  });

router.route('/blogs/:id')
  .put(protect, authorizeRoles('seller'), updateBlog)
  .delete(protect, authorizeRoles('seller'), deleteBlog);

export default router;