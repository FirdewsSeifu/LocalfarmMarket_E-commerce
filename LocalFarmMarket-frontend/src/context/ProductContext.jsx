import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch products and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/api/products'),
          api.get('/api/categories'),
        ]);

        const productsData = productsRes.data;
        const categoriesData = categoriesRes.data;

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data in ProductContext:', error);
      }
    };

    fetchData();
  }, []);

  const addProduct = async (product) => {
    try {
      const res = await api.post('/api/products', product);
      const newProduct = res.data;
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const res = await api.put(`/api/products/${id}`, updatedProduct);
      const data = res.data;
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? data : p))
      );
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const getSellerProducts = (sellerId) => {
    return products.filter((p) => p.sellerId === sellerId);
  };

  const getProductById = (id) => {
    return products.find((p) => p._id === id);
  };

  const getAllCategories = () => {
    return categories;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        getSellerProducts,
        getProductById,
        getAllCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
