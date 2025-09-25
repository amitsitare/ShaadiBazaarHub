import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE, authHeader, getAuth } from '../auth.js';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [durationHours, setDurationHours] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    const { data } = await axios.get(`${API_BASE}/api/services/${id}`);
    setService(data);
  };
  useEffect(() => { load(); }, [id]);

  const openRazorpayAndPay = ({ key, amount, currency, name, description, order_id, prefill, notes }) => {
    return new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error('Razorpay SDK not loaded'));
        return;
      }
      const options = {
        key,
        amount,
        currency,
        name,
        description,
        order_id,
        prefill,
        notes,
        handler: function (response) {
          resolve(response);
        },
        modal: { ondismiss: () => reject(new Error('Payment cancelled')) }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    });
  };

  const ensureRazorpayScript = async () => {
    if (window.Razorpay) return;
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load Razorpay'));
      document.body.appendChild(script);
    });
  };

  const book = async () => {
    setMessage('');
    const auth = getAuth();
    if (!auth.token || auth.role !== 'customer') { setMessage('Please login as customer to book'); return; }
    try {
      await ensureRazorpayScript();

      // 1) Create Razorpay order from backend
      const configResp = await axios.get(`${API_BASE}/api/payments/config`);
      const { key_id } = configResp.data;
      const amountPaise = Math.round(Number(service.price) * 100);
      const orderResp = await axios.post(`${API_BASE}/api/payments/create-order`, {
        amount: amountPaise,
        currency: 'INR',
        receipt: `svc_${id}_${Date.now()}`,
      }, { headers: authHeader() });

      const order = orderResp.data;

      // 2) Open Razorpay checkout
      const payResponse = await openRazorpayAndPay({
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'ShaadiBazaarHub',
        description: service.name,
        order_id: order.id,
        prefill: {},
        notes: { serviceId: id },
      });

      // 3) Verify payment signature
      await axios.post(`${API_BASE}/api/payments/verify`, {
        razorpay_order_id: payResponse.razorpay_order_id,
        razorpay_payment_id: payResponse.razorpay_payment_id,
        razorpay_signature: payResponse.razorpay_signature,
      }, { headers: authHeader() });

      // 4) Create booking only after payment success
      await axios.post(`${API_BASE}/api/bookings/`, {
        service_id: Number(id),
        event_date: eventDate,
        quantity,
        notes,
        address: address || undefined,
        duration_hours: durationHours ? Number(durationHours) : undefined,
      }, { headers: authHeader() });

      setMessage('Payment successful and booking placed!');
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Booking failed');
    }
  };

  if (!service) return <div>Loading...</div>;
  return (
    <div className="row">
      <div className="col-md-8">
        <h2>{service.name}</h2>
        {service.photo_url ? (
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
        ) : (
          <div 
            className="img-fluid mb-3 rounded d-flex align-items-center justify-content-center bg-light"
            style={{
              height: '300px',
              border: '1px solid #dee2e6'
            }}
          >
            <i className="fas fa-image text-muted" style={{ fontSize: '3rem' }}></i>
          </div>
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
              <label className="form-label">Service Address (optional)</label>
              <input type="text" className="form-control" value={address} onChange={e=>setAddress(e.target.value)} placeholder="Venue or full address" />
            </div>
            <div className="mb-2">
              <label className="form-label">Duration (hours, optional)</label>
              <input type="number" min="1" className="form-control" value={durationHours} onChange={e=>setDurationHours(e.target.value)} />
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



