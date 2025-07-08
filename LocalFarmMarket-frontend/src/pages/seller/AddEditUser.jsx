// client/src/pages/seller/AddEditUser.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';

const AddEditUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = id && id !== 'new';
    
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'buyer',
        status: 'active'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            const fetchUser = async () => {
                try {
                    setLoading(true);
                    const res = await api.get(`/api/users/${id}`);
                    setUser({
                        name: res.data.name,
                        email: res.data.email,
                        role: res.data.role,
                        status: res.data.status
                    });
                } catch (error) {
                    toast.error('Failed to fetch user');
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (isEdit) {
                await api.put(`/api/users/${id}`, {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status
                });
                toast.success('User updated successfully');
            } else {
                // Use the new create endpoint
                await api.post('/api/users/create', {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    status: user.status
                });
                toast.success('User created successfully');
            }
            navigate('/seller-users');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                               `Failed to ${isEdit ? 'update' : 'create'} user`;
            toast.error(errorMessage);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEdit) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">
                {isEdit ? 'Edit User' : 'Add New User'}
            </h2>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email*</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                            disabled={isEdit}
                        />
                    </div>
                    
                    {!isEdit && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Password*</label>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                                minLength="6"
                            />
                        </div>
                    )}
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Role*</label>
                        <select
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Status*</label>
                        <select
                            name="status"
                            value={user.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/seller-users')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : isEdit ? 'Update User' : 'Create User'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditUser;