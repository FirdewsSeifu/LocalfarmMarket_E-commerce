import Joi from 'joi';
import mongoose from 'mongoose';

export const validateOrderDTO = (req, res, next) => {
  const schema = Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          product: Joi.string()
            .required()
            .custom((value, helpers) => {
              // Accept either 24-char hex or numeric IDs
              if (!mongoose.Types.ObjectId.isValid(value)) {
                // Try converting numeric IDs
                if (/^\d+$/.test(value)) {
                  return value.padStart(24, '0');
                }
                return helpers.error('any.invalid');
              }
              return value;
            }),
          quantity: Joi.number().integer().min(1).required()
        })
      )
      .min(1)
      .required(),
    total: Joi.number().positive().required(),
    shippingAddress: Joi.string().min(3).max(255).required(),

    paymentMethod: Joi.string()
      .valid('cash', 'card', 'mobile')
      .required()
  }).options({ abortEarly: false });

  const { error, value } = schema.validate(req.body);

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message.replace(/['"]/g, '')
    }));
    return res.status(400).json({ 
      message: 'Validation failed',
      errors 
    });
  }

  // Convert all product IDs to proper ObjectIDs
  req.body.products = value.products.map(item => ({
    product: new mongoose.Types.ObjectId(item.product),
    quantity: item.quantity
  }));

  next();
};