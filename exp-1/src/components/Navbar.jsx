import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/rooms" className="brand">Luxury Hotel</NavLink>
      <NavLink to="/rooms" className={({ isActive }) => isActive ? 'active' : ''}>Rooms</NavLink>
      <NavLink to="/booking" className={({ isActive }) => isActive ? 'active' : ''}>Booking</NavLink>
      <NavLink to="/payment" className={({ isActive }) => isActive ? 'active' : ''}>Payment</NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
      <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''} style={{ marginLeft: 'auto' }}>Login</NavLink>
    </nav>
  );
}
