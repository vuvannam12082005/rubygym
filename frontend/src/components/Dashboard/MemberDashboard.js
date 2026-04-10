import { useEffect, useState } from 'react';
import api from '../../services/api';

function MemberDashboard() {
  const [stats, setStats] = useState({
    subscriptions: 0,
    evaluations: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMemberData() {
      try {
        const [subscriptions, evaluations] = await Promise.all([
          api.get('/subscriptions'),
          api.get('/evaluations')
        ]);

        setStats({
          subscriptions: subscriptions.data.length,
          evaluations: evaluations.data.length
        });
      } catch (requestError) {
        setError('Khong tai duoc thong tin hoi vien.');
      }
    }

    loadMemberData();
  }, []);

  return (
    <section className="page-card">
      <h1>Dashboard hoi vien</h1>
      <div className="stats-grid">
        <article className="stat-card">
          <h3>Goi tap hien co</h3>
          <strong>{stats.subscriptions}</strong>
        </article>
        <article className="stat-card">
          <h3>Danh gia hang thang</h3>
          <strong>{stats.evaluations}</strong>
        </article>
      </div>
      <p>Ban co the xem lich tap, danh gia va dang ky gia han ngay tren menu ben trai.</p>
      {error ? <p className="error-text">{error}</p> : null}
    </section>
  );
}

export default MemberDashboard;
