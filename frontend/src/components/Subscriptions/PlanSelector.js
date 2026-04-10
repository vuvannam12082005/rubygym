import { useState } from 'react';
import api from '../../services/api';

function PlanSelector() {
  const [formData, setFormData] = useState({
    member_id: '',
    plan_type: 'QUARTERLY',
    start_date: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const { data } = await api.post('/subscriptions', {
        member_id: Number(formData.member_id),
        plan_type: formData.plan_type,
        start_date: formData.start_date
      });

      setMessage(`Dang ky thanh cong. Han goi den ${data.end_date}.`);
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Khong dang ky duoc goi tap.');
    }
  };

  return (
    <section className="page-card">
      <h1>Dang ky goi tap</h1>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Member ID
          <input name="member_id" value={formData.member_id} onChange={handleChange} required />
        </label>
        <label>
          Goi tap
          <select name="plan_type" value={formData.plan_type} onChange={handleChange}>
            <option value="QUARTERLY">Quy</option>
            <option value="SEMI_ANNUAL">6 thang</option>
            <option value="ANNUAL">1 nam</option>
          </select>
        </label>
        <label>
          Ngay bat dau
          <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
        </label>
        {message ? <p className="success-text">{message}</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit" className="primary-button">
          Dang ky
        </button>
      </form>
    </section>
  );
}

export default PlanSelector;
