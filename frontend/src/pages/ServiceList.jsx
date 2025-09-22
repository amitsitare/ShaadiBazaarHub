import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE } from '../auth.js';

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const load = async () => {
    const params = {};
    if (query) params.query = query;
    if (location) params.location = location;
    const { data } = await axios.get(`${API_BASE}/api/services/`, { params });
    setServices(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h3>Services</h3>
      <div className="row g-2 mb-3">
        <div className="col-md-4"><input placeholder="Search" className="form-control" value={query} onChange={e=>setQuery(e.target.value)} /></div>
        <div className="col-md-4"><input placeholder="Location" className="form-control" value={location} onChange={e=>setLocation(e.target.value)} /></div>
        <div className="col-md-4"><button className="btn btn-primary w-100" onClick={load}>Filter</button></div>
      </div>
      <div className="row g-3">
        {services.map(s => (
          <div key={s.id} className="col-md-4">
            <div className="card h-100">
              {s.photo_url ? (
                <img 
                  src={s.photo_url} 
                  className="card-img-top" 
                  alt={s.name}
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderBottom: '1px solid #dee2e6'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div 
                  className="card-img-top d-flex align-items-center justify-content-center bg-light"
                  style={{
                    height: '200px',
                    borderBottom: '1px solid #dee2e6'
                  }}
                >
                  <i className="fas fa-image text-muted" style={{ fontSize: '2rem' }}></i>
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{s.name}</h5>
                <p className="card-text">{s.description}</p>
                <p className="card-text"><strong>₹{s.price}</strong> · {s.location}</p>
                <Link className="btn btn-outline-primary" to={`/services/${s.id}`}>View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



