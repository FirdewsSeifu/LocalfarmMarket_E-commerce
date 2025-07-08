import api from '../api';

// Base API URL from environment variable
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/orders`;

// Create new order
const createOrder = async (orderData, token) => {
  if (!token) {
    throw new Error('No authentication token provided');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await api.post(API_URL, orderData, config);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Order creation failed';
    console.error('Order Error:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(errorMessage);
  }
};

// Create a payment record
const createPayment = async (paymentData, token) => {
  if (!token) {
    throw new Error('No authentication token provided');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await api.post(`${API_URL}/payment`, paymentData, config);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Payment creation failed';
    console.error('Payment Error:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(errorMessage);
  }
};

// Get user's orders
const getMyOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(API_URL, config);
  return response.data;
};

// Get seller's orders
const getSellerOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`${API_URL}/seller/orders`, config);
  return response.data;
};

// Update order status
const updateOrderStatus = async (orderId, statusData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(
    `${API_URL}/${orderId}/status`,
    statusData,
    config
  );
  return response.data;
};

// Get order by ID
const getOrderById = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`${API_URL}/${orderId}`, config);
  return response.data;
};

// Remove an order
const removeOrder = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.delete(`${API_URL}/${orderId}`, config);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Failed to remove order';
    console.error('Remove Order Error:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(errorMessage);
  }
};

const orderService = {
  createOrder,
  createPayment, // Add createPayment method here
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
  getOrderById,
  removeOrder,
};

export default orderService;
