import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

function EventDetail() {
  const { id } = useParams();
  const [eventItem, setEventItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadEventDetail() {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEventItem(data);
      } catch (requestError) {
        setError('Khong tai duoc chi tiet su kien.');
      }
    }

    loadEventDetail();
  }, [id]);

  return (
    <section className="page-card">
      <h1>Chi tiet su kien</h1>
      {error ? <p className="error-text">{error}</p> : null}
      {eventItem ? (
        <div className="detail-grid">
          <p><strong>Tieu de:</strong> {eventItem.title}</p>
          <p><strong>Mo ta:</strong> {eventItem.description}</p>
          <p><strong>Thoi gian:</strong> {String(eventItem.event_date).replace('T', ' ').slice(0, 16)}</p>
          <p><strong>Nguoi tao:</strong> {eventItem.created_by_name || 'He thong'}</p>
        </div>
      ) : null}
    </section>
  );
}

export default EventDetail;
