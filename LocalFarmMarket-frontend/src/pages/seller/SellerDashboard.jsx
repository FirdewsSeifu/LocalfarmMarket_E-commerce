// client/src/pages/seller/SellerDashboard.js
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    pendingOrders: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/seller/dashboard-stats');
        setStats(response.data);
      } catch (error) {
        toast.error('Failed to fetch dashboard stats');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Products" value={stats.products} />
        <StatCard title="Total Orders" value={stats.orders} />
        <StatCard title="Total Users" value={stats.users} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Pending Orders" value={stats.pendingOrders} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default SellerDashboard;
