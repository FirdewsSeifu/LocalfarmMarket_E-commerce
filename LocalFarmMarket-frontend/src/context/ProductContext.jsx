import { createContext, useState, useEffect, useContext } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch products and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:5001/api/products'),
          fetch('http://localhost:5001/api/categories'),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch products or categories');
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

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
      const res = await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const res = await fetch(`http://localhost:5001/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? data : p))
      );
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/products/${id}`, {
        method: 'DELETE',
      });
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
