// client/src/pages/seller/ManageUsers.js
import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/api/users'); // removed extra 'await'
            const usersWithStatus = res.data.map(user => ({
                ...user,
                status: user.status || 'active'
            }));
            setUsers(usersWithStatus);
        } catch (error) {
            toast.error('Failed to fetch users');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/api/users/${userId}`);
                setUsers(users.filter(user => user._id !== userId));
                toast.success('User deleted successfully');
            } catch (error) {
                toast.error('Failed to delete user');
                console.error(error);
            }
        }
    };

    const toggleUserStatus = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
        try {
            await api.patch(`/api/users/${userId}/status`, { status: newStatus });
            setUsers(users.map(user =>
                user._id === userId ? { ...user, status: newStatus } : user
            ));
            toast.success(`User status updated to ${newStatus}`);
        } catch (error) {
            toast.error('Failed to update user status');
            console.error(error);
        }
    };

    const updateUserRole = async (userId, newRole) => {
        try {
            await api.patch(`/api/users/${userId}/role`, { role: newRole });
            setUsers(users.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            ));
            toast.success('User role updated');
        } catch (error) {
            toast.error('Failed to update user role');
            console.error(error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Manage Users</h2>
                <p>Loading users...</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Users</h2>
                <Link
    to="/seller-users/edit/new"
    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
>
    Add New User
</Link>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search users..."
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
                            <th className="p-3 border-b">Email</th>
                            <th className="p-3 border-b">Role</th>
                            <th className="p-3 border-b">Status</th>
                            <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="p-3 border-b">{user.name}</td>
                                <td className="p-3 border-b">{user.email}</td>
                                <td className="p-3 border-b">
                                    <select
                                        value={user.role}
                                        onChange={(e) => updateUserRole(user._id, e.target.value)}
                                        className="border p-1 rounded"
                                    >
                                        <option value="buyer">Buyer</option>
                                        <option value="seller">Seller</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-3 border-b">
                                    <button
                                        onClick={() => toggleUserStatus(user._id, user.status)}
                                        className={`px-3 py-1 rounded ${
                                            user.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {user.status}
                                    </button>
                                </td>
                                <td className="p-3 border-b space-x-2">
                                    <Link
                                        to={`/seller-users/edit/${user._id}`}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
