import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE, authHeader } from '../auth.js';

export default function ProviderDashboard() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', photo_url: '', location: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/api/services/my`, { headers: authHeader() });
      setServices(data);
    } catch (err) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', photo_url: '', location: '' });
    setEditingId(null);
    setError('');
    setSuccess('');
  };

  const create = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const payload = { ...form, price: Number(form.price) };
      await axios.post(`${API_BASE}/api/services/`, payload, { headers: authHeader() });
      setSuccess('Service created successfully!');
      resetForm();
      await load();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create service');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (service) => {
    setForm({
      name: service.name,
      description: service.description || '',
      price: service.price.toString(),
      photo_url: service.photo_url || '',
      location: service.location
    });
    setEditingId(service.id);
    setError('');
    setSuccess('');
  };

  const update = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const payload = { ...form, price: Number(form.price) };
      await axios.put(`${API_BASE}/api/services/${editingId}`, payload, { headers: authHeader() });
      setSuccess('Service updated successfully!');
      resetForm();
      await load();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update service');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/api/services/${id}`, { headers: authHeader() });
      setSuccess('Service deleted successfully!');
      await load();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete service');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    resetForm();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5 mb-4">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">{editingId ? 'Edit Service' : 'Add New Service'}</h4>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              
              <form onSubmit={editingId ? update : create}>
                <div className="mb-3">
                  <label className="form-label">Service Name *</label>
                  <input 
                    className="form-control" 
                    placeholder="e.g., Wedding Catering Package" 
                    name="name" 
                    value={form.name} 
                    onChange={onChange} 
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    placeholder="Describe your service..." 
                    name="description" 
                    value={form.description} 
                    onChange={onChange}
                    rows="3"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Price (₹) *</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    min="0"
                    className="form-control" 
                    placeholder="25000" 
                    name="price" 
                    value={form.price} 
                    onChange={onChange} 
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Photo URL</label>
                  <input 
                    className="form-control" 
                    placeholder="https://example.com/photo.jpg" 
                    name="photo_url" 
                    value={form.photo_url} 
                    onChange={onChange} 
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Location *</label>
                  <input 
                    className="form-control" 
                    placeholder="e.g., Mumbai, Delhi" 
                    name="location" 
                    value={form.location} 
                    onChange={onChange} 
                    required 
                  />
                </div>
                
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-primary" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : (editingId ? 'Update Service' : 'Add Service')}
                  </button>
                  
                  {editingId && (
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={cancelEdit}
                      disabled={loading}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-lg-7">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Your Services</h4>
              <span className="badge bg-primary">{services.length} services</span>
            </div>
            <div className="card-body">
              {loading && <div className="text-center py-3">Loading...</div>}
              
              {!loading && services.length === 0 && (
                <div className="text-center py-4 text-muted">
                  <p>No services added yet.</p>
                  <p>Add your first service using the form on the left!</p>
                </div>
              )}
              
              {!loading && services.length > 0 && (
                <div className="list-group">
                  {services.map(service => (
                    <div key={service.id} className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <div className="d-flex align-items-center mb-2">
                            {service.photo_url && (
                              <img 
                                src={service.photo_url} 
                                alt={service.name} 
                                className="rounded me-3" 
                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                              />
                            )}
                            <div>
                              <h6 className="mb-1 fw-bold">{service.name}</h6>
                              <p className="mb-1 text-muted small">{service.description}</p>
                              <div className="d-flex gap-3">
                                <span className="badge bg-success">₹{service.price}</span>
                                <span className="badge bg-info">{service.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-4 text-end">
                          <div className="btn-group" role="group">
                            <button 
                              className="btn btn-sm btn-outline-primary" 
                              onClick={() => startEdit(service)}
                              disabled={loading}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger" 
                              onClick={() => remove(service.id)}
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
