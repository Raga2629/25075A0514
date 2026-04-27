import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [form, setForm] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('booking');
    if (stored) setBooking(JSON.parse(stored));
  }, []);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const formatCard = e => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setForm({ ...form, cardNumber: formatted });
  };

  const submit = e => {
    e.preventDefault();
    if (!form.cardName || !form.cardNumber || !form.expiry || !form.cvv) {
      setError('Please fill in all payment details.');
      return;
    }
    setSuccess(true);
    sessionStorage.clear();
  };

  if (success) {
    return (
      <div className="page" style={{ maxWidth: 480 }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h1>Booking Confirmed!</h1>
          <p style={{ color: '#555', margin: '1rem 0' }}>
            Your reservation has been successfully placed. A confirmation email will be sent shortly.
          </p>
          <button className="btn" onClick={() => navigate('/rooms')}>Browse More Rooms</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ maxWidth: 520 }}>
      <div className="card">
        <h1>Payment</h1>
        {booking && (
          <div className="summary-box">
            <p><strong>Room:</strong> {booking.room?.name}</p>
            <p><strong>Guest:</strong> {booking.name}</p>
            <p><strong>Check-in:</strong> {booking.checkin} &nbsp;|&nbsp; <strong>Check-out:</strong> {booking.checkout}</p>
            <p><strong>Nights:</strong> {booking.nights}</p>
            <p className="total">Total: ₹{booking.total}</p>
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Cardholder Name</label>
            <input name="cardName" placeholder="Enter your name" value={form.cardName} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input name="cardNumber" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={formatCard} maxLength={19} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Expiry (MM/YY)</label>
              <input name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handle} maxLength={5} />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input name="cvv" placeholder="•••" value={form.cvv} onChange={handle} maxLength={4} type="password" />
            </div>
          </div>
          <button className="btn" type="submit" style={{ width: '100%' }}>
            {booking ? `Pay ₹${booking.total}` : 'Confirm Payment'}
          </button>
        </form>
      </div>
    </div>
  );
}
