import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await api.get('/api/seller/products');
            setProducts(res.data);
        } catch (error) {
            toast.error('Failed to fetch products');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/api/seller/products/${id}`);
                setProducts(products.filter(product => product._id !== id));
                toast.success('Product deleted successfully');
            } catch (error) {
                toast.error('Failed to delete product');
                console.error(error);
            }
        }
    };

    const updateStockStatus = async (id, newStatus) => {
        try {
            await api.patch(`/api/seller/products/${id}`, {
                stockStatus: newStatus
            });
            setProducts(products.map(product => 
                product._id === id ? { ...product, stockStatus: newStatus } : product
            ));
            toast.success('Stock status updated');
        } catch (error) {
            toast.error('Failed to update stock status');
            console.error(error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Manage Products</h2>
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Products</h2>
                <Link 
                    to="/seller/products/add" 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add New Product
                </Link>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded shadow">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 border-b">Name</th>
                            <th className="p-3 border-b">Price</th>
                            <th className="p-3 border-b">Stock</th>
                            <th className="p-3 border-b">Category</th>
                            <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="p-3 border-b">{product.name}</td>
                                <td className="p-3 border-b">${product.price}</td>
                                <td className="p-3 border-b">
                                    <select
                                        value={product.stockStatus}
                                        onChange={(e) => updateStockStatus(product._id, e.target.value)}
                                        className={`px-2 py-1 rounded ${
                                            product.stockStatus === 'In Stock' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        <option value="In Stock">In Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                        <option value="Low Stock">Low Stock</option>
                                    </select>
                                </td>
                                <td className="p-3 border-b">{product.category}</td>
                                <td className="p-3 border-b space-x-2">
                                    <Link
                                        to={`/seller/products/edit/${product._id}`}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;