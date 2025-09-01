import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, clearAuth } from '../auth.js';

export default function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const logout = () => { clearAuth(); navigate('/'); };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">ShaadiSphere</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample" aria-controls="navbarsExample" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
            {auth.role === 'provider' && (
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
            )}
            {auth.role === 'customer' && (
              <li className="nav-item"><Link className="nav-link" to="/my-bookings">My Bookings</Link></li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!auth.token ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            ) : (
              <li className="nav-item"><button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}



