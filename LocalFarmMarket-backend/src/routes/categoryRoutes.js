// src/routes/categoryRoutes.js
import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js'; // Named imports
import { protect, authorizeRoles } from '../middleware/authMiddleware.js'; // If needed
import Category from '../models/Category.js';

const router = express.Router();

// @route   POST /api/categories
// @desc    Create a new category (supporting single and multiple categories)
// @access  Private/Admin
router.post('/', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body]; // Handle both single and multiple categories
    const categories = await Category.insertMany(data);
    res.status(201).json(categories);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create categories', details: error });
  }
});

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getCategories); // Correct route using named export

export default router; // Use default export for the router
