import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ServiceList from './pages/ServiceList.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import ProviderDashboard from './pages/ProviderDashboard.jsx';
import MyBookings from './pages/MyBookings.jsx';
import { getAuth } from './auth.js';

function PrivateRoute({ children, role }) {
  const auth = getAuth();
  if (!auth.token) return <Navigate to="/login" replace />;
  if (role && auth.role !== role) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-fill container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/dashboard" element={
            <PrivateRoute role="provider"><ProviderDashboard /></PrivateRoute>
          } />
          <Route path="/my-bookings" element={
            <PrivateRoute role="customer"><MyBookings /></PrivateRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}



