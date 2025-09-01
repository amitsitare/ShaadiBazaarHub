import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE, authHeader } from '../auth.js';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const load = async () => {
    const { data } = await axios.get(`${API_BASE}/api/bookings/my`, { headers: authHeader() });
    setBookings(data);
  };
  useEffect(() => { load(); }, []);
  return (
    <div>
      <h3>My Bookings</h3>
      <div className="list-group">
        {bookings.map(b => (
          <div key={b.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <div><strong>Service ID:</strong> {b.service_id}</div>
                <div><strong>Date:</strong> {b.event_date}</div>
                <div><strong>Qty:</strong> {b.quantity}</div>
                {b.notes && <div><strong>Notes:</strong> {b.notes}</div>}
              </div>
              <span className="badge bg-secondary align-self-start">{b.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



