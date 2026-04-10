import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

function TrainerDetail() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTrainer() {
      try {
        const { data } = await api.get(`/trainers/${id}`);
        setTrainer(data);
      } catch (requestError) {
        setError('Khong tai duoc thong tin huynh luyen vien.');
      }
    }

    loadTrainer();
  }, [id]);

  return (
    <section className="page-card">
      <h1>Chi tiet huynh luyen vien</h1>
      {error ? <p className="error-text">{error}</p> : null}
      {trainer ? (
        <div className="detail-grid">
          <p><strong>Ho ten:</strong> {trainer.full_name}</p>
          <p><strong>Email:</strong> {trainer.email}</p>
          <p><strong>So dien thoai:</strong> {trainer.phone}</p>
          <p><strong>Chuyen mon:</strong> {trainer.specialization || 'Dang cap nhat'}</p>
          <p><strong>So gio toi da/ngay:</strong> {trainer.max_daily_hours}</p>
        </div>
      ) : null}
    </section>
  );
}

export default TrainerDetail;
