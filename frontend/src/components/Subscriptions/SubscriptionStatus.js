import { useEffect, useState } from 'react';
import api from '../../services/api';

function SubscriptionStatus() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSubscriptions() {
      try {
        const { data } = await api.get('/subscriptions');
        setSubscriptions(data);
      } catch (requestError) {
        setError('Khong tai duoc danh sach goi tap.');
      }
    }

    loadSubscriptions();
  }, []);

  return (
    <section className="page-card">
      <h1>Tinh trang goi tap</h1>
      {error ? <p className="error-text">{error}</p> : null}
      <div className="list-grid">
        {subscriptions.map((subscription) => (
          <article key={subscription.id} className="list-card">
            <h3>{subscription.member_name}</h3>
            <p>Loai goi: {subscription.plan_type}</p>
            <p>Bat dau: {String(subscription.start_date).slice(0, 10)}</p>
            <p>Ket thuc: {String(subscription.end_date).slice(0, 10)}</p>
            <p>Trang thai: {subscription.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SubscriptionStatus;
