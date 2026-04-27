import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = e => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <div className="page">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <div>
          <span>📍</span>
          <p>123 Luxury Ave, Miami Beach, FL 33139</p>
        </div>
        <div>
          <span>📞</span>
          <p>+1 (800) 555-LUXE</p>
        </div>
        <div>
          <span>✉️</span>
          <p>hello@luxestay.com</p>
        </div>
        <div>
          <span>🕐</span>
          <p>24/7 Front Desk Support</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 560 }}>
        <h2>Send a Message</h2>
        {sent ? (
          <div className="alert alert-success">Thanks! We'll get back to you within 24 hours.</div>
        ) : (
          <form onSubmit={submit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Name *</label>
                <input name="name" placeholder="enter name" value={form.name} onChange={handle} />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handle} />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input name="subject" placeholder="Reservation inquiry..." value={form.subject} onChange={handle} />
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea name="message" rows={5} placeholder="How can we help you?" value={form.message} onChange={handle} />
            </div>
            <button className="btn" type="submit">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
}
