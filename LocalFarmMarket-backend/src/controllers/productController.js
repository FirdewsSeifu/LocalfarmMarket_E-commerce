import Product from '../models/Product.js';
//import productsData from '../../data/products.json' assert { type: 'json' };
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load product data from JSON
const productsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../data/products.json'), 'utf-8')
);

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get seller's products
export const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single product
export const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    // Destructure to remove _id if it exists
    const { _id, ...safeData } = req.body;

    const product = new Product({
      ...safeData,
      seller: req.user.id
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Update product - ensure seller ownership
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.id },
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ 
      _id: req.params.id, 
      seller: req.user.id 
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search products
export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      name: { $regex: query, $options: 'i' },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Seed products (dev only)
export const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    const products = await Product.insertMany(productsData);
    res.json({ message: `${products.length} products seeded successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add review
export const addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newReview = {
      user: req.user.id,
      content: req.body.content,
      rating: req.body.rating,
      date: new Date()
    };

    product.reviews.push(newReview);
    const totalRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.rating = totalRatings / product.reviews.length;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};