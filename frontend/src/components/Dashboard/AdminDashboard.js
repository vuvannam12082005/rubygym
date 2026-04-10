import { useEffect, useState } from 'react';
import api from '../../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({
    trainers: 0,
    members: 0,
    subscriptions: 0,
    events: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadStats() {
      try {
        const [trainers, members, subscriptions, events] = await Promise.all([
          api.get('/trainers'),
          api.get('/members'),
          api.get('/subscriptions'),
          api.get('/events')
        ]);

        setStats({
          trainers: trainers.data.length,
          members: members.data.length,
          subscriptions: subscriptions.data.length,
          events: events.data.length
        });
      } catch (requestError) {
        setError('Khong tai duoc so lieu dashboard.');
      }
    }

    loadStats();
  }, []);

  return (
    <section className="page-card">
      <h1>Dashboard quan tri</h1>
      <div className="stats-grid">
        <article className="stat-card">
          <h3>Huynh luyen vien</h3>
          <strong>{stats.trainers}</strong>
        </article>
        <article className="stat-card">
          <h3>Hoi vien</h3>
          <strong>{stats.members}</strong>
        </article>
        <article className="stat-card">
          <h3>Goi tap</h3>
          <strong>{stats.subscriptions}</strong>
        </article>
        <article className="stat-card">
          <h3>Su kien</h3>
          <strong>{stats.events}</strong>
        </article>
      </div>
      {error ? <p className="error-text">{error}</p> : null}
    </section>
  );
}

export default AdminDashboard;
