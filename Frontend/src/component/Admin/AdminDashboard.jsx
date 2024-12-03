import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllUsers from './AllUsers';
import AllProducts from './AllProducts';
import ProductBids from './ProductBids';
import Auctions from './Auctions';

const AdminDashboard = () => {
  const [view, setView] = useState('dashboard'); // Track which page is displayed
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (view === 'dashboard') {
      fetchDashboardData();
    }
  }, [view]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/v1/auction/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDashboardData(response.data.data);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const renderView = () => {
    switch (view) {
      case 'users':
        return <AllUsers />;
      case 'products':
        return <AllProducts />;
      case 'bids':
        return <ProductBids />;
      case 'auctions':
        return <Auctions />;
      default:
        return (
          <div>
            <h1>Dashboard Overview</h1>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : dashboardData ? (
              <div>
                <p>Total Users: {dashboardData.totalUsers}</p>
                <p>Total Products: {dashboardData.totalProducts}</p>
                <p>Approved Products: {dashboardData.approvedProducts}</p>
                <p>Pending Approvals: {dashboardData.pendingApprovals}</p>
                <p>Total Auctions: {dashboardData.totalAuctions}</p>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '250px',
          background: '#f4f4f4',
          padding: '20px',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2>Admin Dashboard</h2>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <button onClick={() => setView('dashboard')} style={{ width: '100%' }}>
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => setView('users')} style={{ width: '100%' }}>
                Manage Users
              </button>
            </li>
            <li>
              <button onClick={() => setView('products')} style={{ width: '100%' }}>
                Manage Products
              </button>
            </li>
            <li>
              <button onClick={() => setView('bids')} style={{ width: '100%' }}>
                View Product Bids
              </button>
            </li>
            <li>
              <button onClick={() => setView('auctions')} style={{ width: '100%' }}>
                Manage Auctions
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '20px' }}>{renderView()}</main>
    </div>
  );
};

export default AdminDashboard;
