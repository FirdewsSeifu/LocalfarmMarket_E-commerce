// client/src/pages/seller/ManageOrders.js
import React, { useEffect, useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, [statusFilter]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const url = statusFilter === 'all' 
                ? '/api/seller/orders'
                : `/api/seller/orders?status=${statusFilter}`;
            const res = await api.get(url);
            setOrders(res.data);
        } catch (error) {
            toast.error('Failed to fetch orders');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await api.patch(`/api/seller/orders/${orderId}`, {
                status: newStatus
            });
            setOrders(orders.map(order => 
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
            toast.success('Order status updated');
        } catch (error) {
            toast.error('Failed to update order status');
            console.error(error);
        }
    };

    const deleteOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await api.delete(`/api/seller/orders/${orderId}`);
                setOrders(orders.filter(order => order._id !== orderId));
                toast.success('Order deleted successfully');
            } catch (error) {
                toast.error('Failed to delete order');
                console.error(error);
            }
        }
    };

    if (loading) {
        return (
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Manage Orders</h2>
                <p>Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

            <div className="mb-4 flex items-center space-x-4">
                <label>Filter by status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded shadow">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 border-b">Order ID</th>
                            <th className="p-3 border-b">Date</th>
                            <th className="p-3 border-b">Customer</th>
                            <th className="p-3 border-b">Amount</th>
                            <th className="p-3 border-b">Status</th>
                            <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="p-3 border-b">#{order._id.slice(-6)}</td>
                                <td className="p-3 border-b">
                                    {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                                </td>
                                <td className="p-3 border-b">
                                    {order.user?.name || 'Guest'}
                                </td>
                                <td className="p-3 border-b">${order.totalAmount?.toFixed(2)}</td>
                                <td className="p-3 border-b">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                        className={`px-2 py-1 rounded ${
                                            order.status === 'delivered' 
                                                ? 'bg-green-100 text-green-800'
                                                : order.status === 'cancelled'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="p-3 border-b space-x-2">
                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;