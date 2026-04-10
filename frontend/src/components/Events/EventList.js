import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function EventList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadEvents() {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
      } catch (requestError) {
        setError('Khong tai duoc danh sach su kien.');
      }
    }

    loadEvents();
  }, []);

  return (
    <section className="page-card">
      <h1>Su kien RubyGYM</h1>
      {error ? <p className="error-text">{error}</p> : null}
      <div className="list-grid">
        {events.map((eventItem) => (
          <article key={eventItem.id} className="list-card">
            <h3>{eventItem.title}</h3>
            <p>{eventItem.description}</p>
            <p>Thoi gian: {String(eventItem.event_date).replace('T', ' ').slice(0, 16)}</p>
            <Link to={`/events/${eventItem.id}`}>Xem chi tiet</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default EventList;
