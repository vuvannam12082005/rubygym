import { useEffect, useState } from 'react';
import api from '../../services/api';

function EvaluationList() {
  const [evaluations, setEvaluations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadEvaluations() {
      try {
        const { data } = await api.get('/evaluations');
        setEvaluations(data);
      } catch (requestError) {
        setError('Khong tai duoc danh sach danh gia.');
      }
    }

    loadEvaluations();
  }, []);

  return (
    <section className="page-card">
      <h1>Danh gia hang thang</h1>
      {error ? <p className="error-text">{error}</p> : null}
      <div className="list-grid">
        {evaluations.map((evaluation) => (
          <article key={evaluation.id} className="list-card">
            <h3>{evaluation.member_name}</h3>
            <p>HLV: {evaluation.trainer_name}</p>
            <p>Thang: {String(evaluation.month_year).slice(0, 10)}</p>
            <p>Can nang muc tieu: {evaluation.target_weight}</p>
            <p>Can nang thuc te: {evaluation.actual_weight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default EvaluationList;
