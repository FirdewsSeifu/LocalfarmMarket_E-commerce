import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../../api';

const ProductForm = ({ product: initialProduct, onSubmit, onCancel }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',  // Changed from 'category' to match schema
    images: [],
    isFeatured: false
  });
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);

useEffect(() => {
  // Hardcoded farm product categories
  setCategories([
    { _id: '64f002a1b1c3e20012345690', name: 'Dairy' },
    { _id: '64f002a1b1c3e20012345691', name: 'Fruits' },
    { _id: '64f002a1b1c3e20012345692', name: 'Vegetables' },
    { _id: '64f002a1b1c3e20012345693', name: 'Grains' },
    { _id: '64f002a1b1c3e20012345694', name: 'Meat & Poultry' },
    { _id: '64f002a1b1c3e20012345695', name: 'Eggs' },
    { _id: '64f002a1b1c3e20012345696', name: 'Honey' },
  ]);

  if (id && initialProduct) {
    setProduct(initialProduct);
  } else if (id) {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load product');
        navigate('/seller/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }
}, [id, initialProduct, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleAddImage = () => {
    if (newImage.trim() && !product.images.includes(newImage.trim())) {
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const handleRemoveImage = (imgToRemove) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imgToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!product.name || !product.description || product.stock == null || !product.categoryId) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare product data
      const productData = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock)
      };

      // Remove _id for new products
      if (!id && productData._id) {
        delete productData._id;
      }

      // Call the onSubmit prop if it exists, otherwise handle submission here
      if (onSubmit) {
        await onSubmit(productData);
      } else {
        if (id) {
          await api.put(`/api/seller/products/${id}`, productData);
          toast.success('Product updated successfully');
        } else {
          await api.post('/api/seller/products', {
            ...productData,
            seller: currentUser._id  // Add seller ID
          });
          toast.success('Product created successfully');
        }
        navigate('/seller/products');
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return <div className="p-4">Loading product data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'Add'} Product</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
              <select
                name="categoryId"  // Changed to match schema
                value={product.categoryId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
              <div className="flex">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Paste image URL"
                  className="flex-1 p-2 border rounded-l"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="bg-blue-500 text-white px-4 rounded-r"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {product.images.map((img, index) => (
                  <div key={index} className="flex items-center">
                    <img 
                      src={img} 
                      alt={`Preview ${index}`} 
                      className="h-10 w-10 object-cover mr-2 rounded"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                    />
                    <span className="truncate flex-1 text-sm">{img}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img)}
                      className="text-red-500 ml-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="isFeatured"
                checked={product.isFeatured}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="featured" className="text-sm text-gray-700">
                Featured Product
              </label>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel || (() => navigate('/seller/products'))}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {loading ? 'Processing...' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;