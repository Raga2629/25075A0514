import { useNavigate } from 'react-router-dom';

const rooms = [
  {
    id: 1,
    name: 'Standard Room',
    description: 'Cozy room with city view, queen bed, free Wi-Fi.',
    price: 1449,
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
  },
  {
    id: 2,
    name: 'Deluxe Room',
    description: 'Spacious room with king bed, mini-bar, and balcony.',
    price: 1449,
    img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80',
  },
  {
    id: 3,
    name: 'Suite',
    description: 'Luxury suite with living area, jacuzzi, and ocean view.',
    price: 1900,
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80',
  },
  {
    id: 4,
    name: 'Family Room',
    description: 'Two bedrooms, kitchenette, perfect for families.',
    price: 1999,
    img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=80',
  },
  {
    id: 5,
    name: 'Penthouse',
    description: 'Top-floor penthouse with panoramic views and private pool.',
    price: 599,
    img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80',
  },
  {
    id: 6,
    name: 'Budget Single',
    description: 'Affordable single room with all essentials included.',
    price: 59,
    img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&q=80',
  },
];

export default function Rooms() {
  const navigate = useNavigate();

  const book = (room) => {
    sessionStorage.setItem('selectedRoom', JSON.stringify(room));
    navigate('/booking');
  };

  return (
    <div className="page">
      <h1>Our Rooms</h1>
      <div className="rooms-grid">
        {rooms.map(room => (
          <div className="room-card" key={room.id}>
            <img src={room.img} alt={room.name} />
            <div className="room-info">
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="price">₹{room.price}/night</span>
                <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => book(room)}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
