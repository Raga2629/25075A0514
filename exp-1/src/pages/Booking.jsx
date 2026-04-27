import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', checkin: '', checkout: '', guests: 1 });
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('selectedRoom');
    if (stored) setRoom(JSON.parse(stored));
  }, []);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const nights = () => {
    if (!form.checkin || !form.checkout) return 0;
    const diff = new Date(form.checkout) - new Date(form.checkin);
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  const submit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.checkin || !form.checkout) {
      setError('Please fill in all required fields.');
      return;
    }
    if (nights() < 1) {
      setError('Check-out must be after check-in.');
      return;
    }
    const booking = { ...form, room, nights: nights(), total: nights() * (room?.price || 0) };
    sessionStorage.setItem('booking', JSON.stringify(booking));
    navigate('/payment');
  };

  return (
    <div className="page" style={{ maxWidth: 560 }}>
      <div className="card">
        <h1>Book a Room</h1>
        {room && (
          <div className="summary-box">
            <p><strong>{room.name}</strong> — ₹{room.price}/night</p>
            {nights() > 0 && <p className="total">Total: ₹{nights() * room.price} ({nights()} nights)</p>}
          </div>
        )}
        {!room && (
          <div className="alert alert-error">
            No room selected. <a href="/rooms" style={{ color: '#e94560' }}>Browse rooms</a>
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input name="name" placeholder="Enter Name" value={form.name} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Check-in *</label>
              <input type="date" name="checkin" value={form.checkin} onChange={handle} />
            </div>
            <div className="form-group">
              <label>Check-out *</label>
              <input type="date" name="checkout" value={form.checkout} onChange={handle} />
            </div>
          </div>
          <div className="form-group">
            <label>Guests</label>
            <select name="guests" value={form.guests} onChange={handle}>
              {[1,2,3,4].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <button className="btn" type="submit" style={{ width: '100%' }}>Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
}
