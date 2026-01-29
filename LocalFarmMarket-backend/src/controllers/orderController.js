import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Payment from '../models/Payment.js';


// Create new order
// Create new order with simulated payment status
export const createOrder = async (req, res) => {
  try {
    // Retrieve product details with prices
    const productsWithPrices = await Promise.all(
      req.body.products.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product ${item.product} not found`);
        }
        return {
          product: item.product,
          quantity: item.quantity,
          priceAtPurchase: product.price,
        };
      })
    );

    // Create the order
    const order = await Order.create({
      products: productsWithPrices,
      total: req.body.total,
      buyer: req.user.id,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: 'completed', // Simulating successful payment
    });

    // Here you could add additional logic to handle payment failures or further payment processing
    // For example, if paymentMethod is "card", you might call a payment provider API to validate the payment.

    res.status(201).json(order); // Respond with the created order details
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Get orders for logged-in buyer
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate('products.product')
      .sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get orders for seller's products
export const getSellerOrders = async (req, res) => {
  try {
    const sellerProducts = await Product.find({ seller: req.user.id });
    const productIds = sellerProducts.map(p => p._id);

    const orders = await Order.find({
      'products.product': { $in: productIds },
    })
      .populate('buyer', 'name email')
      .populate('products.product')
      .sort('-createdAt');

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update overall order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id)
      .populate('products.product')
      .populate('buyer', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure only admin or seller of at least one product can update
    if (!order.products.every(item => item.product)) {
      return res.status(400).json({ message: 'Order contains invalid product references' });
    }
    
    const isSeller = order.products.some(
      item => item.product?.seller?.toString() === req.user.id
    );
    
    if (!isSeller) {
      return res.status(403).json({ message: 'Only sellers can update status' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'name email')
      .populate('products.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isBuyer = order.buyer._id.toString() === req.user.id;
    if (!order.products.every(item => item.product)) {
      return res.status(400).json({ message: 'Invalid product reference in order' });
    }
    
    const isSeller = order.products.some(
      item => item.product?.seller?.toString() === req.user.id
    );
    

    if (!isBuyer && !isSeller) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// Delete an order by ID
export const removeOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Add to your orderController
export const createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, amount, status } = req.body;

    // Verify the order belongs to the user making the request
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.buyer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to create payment for this order' });
    }

    const payment = new Payment({
      orderId,
      paymentMethod,
      amount,
      status,
    });

    await payment.save();

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

