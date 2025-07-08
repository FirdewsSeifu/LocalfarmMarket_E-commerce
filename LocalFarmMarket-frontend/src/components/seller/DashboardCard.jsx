import React from 'react';

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} p-6 rounded-lg shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
};

export default DashboardCard;