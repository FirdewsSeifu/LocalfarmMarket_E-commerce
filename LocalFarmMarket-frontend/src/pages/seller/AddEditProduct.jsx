import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProductForm from '../../components/seller/ProductForm';
import { toast } from 'react-toastify';
import api from '../../api';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Changed from user to currentUser
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await api.get(`/api/products/${id}`);
          setProduct(res.data);
        } catch (error) {
          console.error(error);
          toast.error('Failed to fetch product');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [id]);

const handleSubmit = async (productData) => {
  try {
    if (!currentUser) {
      toast.error('Please log in to continue');
      navigate('/login');
      return;
    }

    // Validate required fields
    if (!productData.name || !productData.description || productData.stock === undefined) {
      toast.error('Please fill all required fields');
      return;
    }

    const sanitizedData = { 
      ...productData,
      stock: Number(productData.stock) || 0 // Ensure stock is a number
    };

    // Remove _id when creating new product
    if (!id && sanitizedData._id) {
      delete sanitizedData._id;
    }

    if (id) {
      // Update product
      await api.put(`/api/seller/products/${id}`, sanitizedData);
      toast.success('Product updated successfully');
    } else {
      // Create new product
      await api.post('/api/seller/products', {
        ...sanitizedData,
        seller: currentUser._id
      });
      toast.success('Product created successfully');
    }

    navigate('/seller/products');
  } catch (error) {
    if (error.response) {
      console.error('Backend error response:', error.response.data);
      toast.error(`Error: ${error.response.data.message || 'Failed to submit product'}`);
    } else {
      toast.error(`Failed to ${id ? 'update' : 'create'} product`);
      console.error(error);
    }
  }
};


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-product">
      <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
      <ProductForm 
        product={product} 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/seller/products')}
      />
    </div>
  );
};

export default AddEditProduct;