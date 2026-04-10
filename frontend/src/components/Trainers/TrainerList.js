import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function TrainerList() {
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTrainers() {
      try {
        const { data } = await api.get('/trainers');
        setTrainers(data);
      } catch (requestError) {
        setError('Khong tai duoc danh sach huynh luyen vien.');
      }
    }

    loadTrainers();
  }, []);

  return (
    <section className="page-card">
      <h1>Danh sach huynh luyen vien</h1>
      {error ? <p className="error-text">{error}</p> : null}
      <div className="list-grid">
        {trainers.map((trainer) => (
          <article key={trainer.id} className="list-card">
            <h3>{trainer.full_name}</h3>
            <p>Chuyen mon: {trainer.specialization || 'Dang cap nhat'}</p>
            <p>Email: {trainer.email}</p>
            <Link to={`/trainers/${trainer.id}`}>Xem chi tiet</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TrainerList;
