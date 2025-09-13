import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE, authHeader, getAuth } from '../auth.js';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    const { data } = await axios.get(`${API_BASE}/api/services/${id}`);
    setService(data);
  };
  useEffect(() => { load(); }, [id]);

  const book = async () => {
    setMessage('');
    const auth = getAuth();
    if (!auth.token || auth.role !== 'customer') { setMessage('Please login as customer to book'); return; }
    try {
      await axios.post(`${API_BASE}/api/bookings/`, { service_id: Number(id), event_date: eventDate, quantity, notes }, { headers: authHeader() });
      setMessage('Booking placed!');
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Booking failed');
    }
  };

  if (!service) return <div>Loading...</div>;
  return (
    <div className="row">
      <div className="col-md-8">
        <h2>{service.name}</h2>
        {service.photo_url && (
          <img 
            src={service.photo_url} 
            className="img-fluid mb-3 rounded" 
            alt={service.name}
            style={{
              maxHeight: '400px',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              border: '1px solid #dee2e6'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <p>{service.description}</p>
        <p><strong>₹{service.price}</strong> · {service.location}</p>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5>Book this service</h5>
            {message && <div className="alert alert-info">{message}</div>}
            <div className="mb-2">
              <label className="form-label">Event Date</label>
              <input type="date" className="form-control" value={eventDate} onChange={e=>setEventDate(e.target.value)} />
            </div>
            <div className="mb-2">
              <label className="form-label">Quantity</label>
              <input type="number" min="1" className="form-control" value={quantity} onChange={e=>setQuantity(Number(e.target.value))} />
            </div>
            <div className="mb-2">
              <label className="form-label">Notes</label>
              <textarea className="form-control" value={notes} onChange={e=>setNotes(e.target.value)} />
            </div>
            <button className="btn btn-primary w-100" onClick={book}>Book</button>
          </div>
        </div>
      </div>
    </div>
  );
}



