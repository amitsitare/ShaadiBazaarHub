import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../auth.js';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', address: '', role: 'customer', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await axios.post(`${API_BASE}/api/auth/register`, form);
      setSuccess('Registration successful. Please login.');
      setTimeout(()=>navigate('/login'), 800);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h3>Register</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={onSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input className="form-control" name="name" value={form.name} onChange={onChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={onChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Mobile</label>
              <input className="form-control" name="mobile" value={form.mobile} onChange={onChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input className="form-control" name="address" value={form.address} onChange={onChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select className="form-select" name="role" value={form.role} onChange={onChange}>
                <option value="customer">Customer</option>
                <option value="provider">Service Provider</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={form.password} onChange={onChange} required />
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary" type="submit">Create account</button>
          </div>
        </form>
      </div>
    </div>
  );
}



