import { useProducts } from '../../context/ProductContext';
import { useState } from 'react';
import ProductForm from './ProductForm';

const ProductTable = ({ sellerId }) => {
  const { products, deleteProduct, updateProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      alert('Product deleted successfully!');
    }
  };

  const handleEdit = (productData) => {
    updateProduct(productData.id, productData);
    alert('Product updated successfully!');
    setEditingProduct(null);
  };

  const sellerProducts = products.filter(p => p.sellerId === sellerId);

  return (
    <div className="product-table">
      {editingProduct ? (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleEdit}
          onCancel={() => setEditingProduct(null)}
        />
      ) : (
        <>
          {sellerProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.map(product => (
                  <tr key={product.id}>
                    <td>
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          width="50"
                          height="50"
                        />
                      )}
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td>
                      <button className="edit-button" onClick={() => setEditingProduct(product)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ProductTable;
