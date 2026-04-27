import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    // Mock auth — any credentials work
    navigate('/rooms');
  };

  return (
    <div className="page" style={{ maxWidth: 420 }}>
      <div className="card">
        <h1>Welcome Back</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>Sign in to manage your bookings</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handle} />
          </div>
          <button className="btn" type="submit" style={{ width: '100%' }}>Sign In</button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#888', textAlign: 'center' }}>
          Don't have an account? <a href="#" style={{ color: '#e94560' }}>Register</a>
        </p>
      </div>
    </div>
  );
}
