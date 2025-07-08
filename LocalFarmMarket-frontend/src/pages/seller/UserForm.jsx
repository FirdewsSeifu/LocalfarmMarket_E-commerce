import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'buyer',
    isActive: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`/api/seller/users/${id}`);
          setUser({
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
            isActive: res.data.isActive
          });
        } catch (error) {
          console.log(error)
          toast.error('Failed to load user');
          navigate('/seller-users');
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await axios.put(`/api/seller/users/${id}`, user);
        toast.success('User updated successfully');
      } else {
        await axios.post('/api/seller/users', user);
        toast.success('User created successfully');
      }
      navigate('/seller-users');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'buyer', label: 'Buyer' },
    { value: 'seller', label: 'Seller' },
    { value: 'admin', label: 'Admin' }
  ];

  if (loading && id) {
    return <div className="p-4">Loading user data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'Add'} User</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              disabled={!!id}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              {roleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              name="isActive"
              checked={user.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="active" className="text-sm text-gray-700">
              Active Account
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/seller-users')}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Processing...' : 'Save User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;