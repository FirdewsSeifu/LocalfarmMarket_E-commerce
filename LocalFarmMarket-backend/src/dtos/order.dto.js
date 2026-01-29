import Joi from 'joi';

export const validateOrderDTO = (req, res, next) => {
  const schema = Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().hex().length(24).required(),
          quantity: Joi.number().integer().min(1).required(),
        })
      )
      .min(1)
      .required(),
    total: Joi.number().positive().required(),
    shippingAddress: Joi.string().required(),
    paymentMethod: Joi.string().valid('cash', 'card', 'mobile').required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};