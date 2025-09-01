import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE, setAuth } from '../auth.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data: token } = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
      // fetch profile for role
      const { data: profile } = await axios.get(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token.access_token}` }
      });
      setAuth(token.access_token, profile.role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}



