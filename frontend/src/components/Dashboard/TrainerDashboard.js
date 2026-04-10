import { useEffect, useState } from 'react';
import api from '../../services/api';

function TrainerDashboard() {
  const [stats, setStats] = useState({
    evaluations: 0,
    subscriptions: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTrainerData() {
      try {
        const [evaluations, subscriptions] = await Promise.all([
          api.get('/evaluations'),
          api.get('/subscriptions')
        ]);

        setStats({
          evaluations: evaluations.data.length,
          subscriptions: subscriptions.data.length
        });
      } catch (requestError) {
        setError('Khong tai duoc thong tin cua huynh luyen vien.');
      }
    }

    loadTrainerData();
  }, []);

  return (
    <section className="page-card">
      <h1>Dashboard huynh luyen vien</h1>
      <div className="stats-grid">
        <article className="stat-card">
          <h3>Danh gia da tao</h3>
          <strong>{stats.evaluations}</strong>
        </article>
        <article className="stat-card">
          <h3>Goi tap cua hoc vien</h3>
          <strong>{stats.subscriptions}</strong>
        </article>
      </div>
      <p>Goi y: mo muc lich tap va danh gia de quan ly hoc vien trong thang.</p>
      {error ? <p className="error-text">{error}</p> : null}
    </section>
  );
}

export default TrainerDashboard;
