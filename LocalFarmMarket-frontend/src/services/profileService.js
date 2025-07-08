import api from '../api';

// Use the same base URL pattern as orderService
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

const updateProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await api.put(`${API_URL}/profile`, profileData, config);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Profile update failed';
    console.error('Profile Error:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(errorMessage);
  }
};

export default {
  updateProfile,
};