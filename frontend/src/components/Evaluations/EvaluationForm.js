import { useState } from 'react';
import api from '../../services/api';

function EvaluationForm() {
  const [formData, setFormData] = useState({
    member_id: '',
    trainer_id: '',
    month_year: '',
    target_weight: '',
    actual_weight: '',
    target_bmi: '',
    actual_bmi: '',
    notes: ''
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
      const { data } = await api.post('/evaluations', {
        member_id: Number(formData.member_id),
        trainer_id: formData.trainer_id ? Number(formData.trainer_id) : undefined,
        month_year: formData.month_year,
        target_weight: Number(formData.target_weight),
        actual_weight: Number(formData.actual_weight),
        target_bmi: Number(formData.target_bmi),
        actual_bmi: Number(formData.actual_bmi),
        notes: formData.notes
      });

      setMessage(`Da tao danh gia #${data.evaluationId}`);
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Khong tao duoc danh gia.');
    }
  };

  return (
    <section className="page-card">
      <h1>Tao danh gia moi</h1>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          ID hoi vien
          <input name="member_id" value={formData.member_id} onChange={handleChange} required />
        </label>
        <label>
          ID HLV
          <input name="trainer_id" value={formData.trainer_id} onChange={handleChange} />
        </label>
        <label>
          Thang danh gia
          <input type="date" name="month_year" value={formData.month_year} onChange={handleChange} required />
        </label>
        <label>
          Can nang muc tieu
          <input name="target_weight" value={formData.target_weight} onChange={handleChange} required />
        </label>
        <label>
          Can nang thuc te
          <input name="actual_weight" value={formData.actual_weight} onChange={handleChange} required />
        </label>
        <label>
          BMI muc tieu
          <input name="target_bmi" value={formData.target_bmi} onChange={handleChange} required />
        </label>
        <label>
          BMI thuc te
          <input name="actual_bmi" value={formData.actual_bmi} onChange={handleChange} required />
        </label>
        <label>
          Ghi chu
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" />
        </label>
        {message ? <p className="success-text">{message}</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit" className="primary-button">
          Luu danh gia
        </button>
      </form>
    </section>
  );
}

export default EvaluationForm;
