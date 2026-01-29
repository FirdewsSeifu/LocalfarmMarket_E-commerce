// src/dtos/product.dto.js
import { body, validationResult } from 'express-validator';

exports.validateProductDTO = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0'),
  body('category').optional().isString(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
