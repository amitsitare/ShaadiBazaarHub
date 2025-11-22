import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, clearAuth } from '../auth.js';

export default function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const logout = () => { clearAuth(); navigate('/'); };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ fontSize: '1.5rem', color: '#dc2626' }}>
          <i className="fas fa-heart me-2"></i>ShaadiBazaarHub
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample" aria-controls="navbarsExample" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                <i className="fas fa-list me-1"></i>Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-home me-1"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact-us">
                <i className="fas fa-envelope me-1"></i>Contact Us
              </Link>
            </li>
            {!auth.token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i>Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <i className="fas fa-user-plus me-1"></i>Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={auth.role === 'customer' ? '/my-bookings' : '/dashboard'}>
                    <i className="fas fa-shopping-bag me-1"></i>Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                    <i className="fas fa-sign-out-alt me-1"></i>Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}



