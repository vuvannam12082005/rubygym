import { useState } from 'react';
import api from '../../services/api';

function CreateSession() {
  const [formData, setFormData] = useState({
    trainer_id: '',
    session_date: '',
    start_time: '05:30:00',
    end_time: '06:30:00',
    member_ids: ''
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
      const payload = {
        trainer_id: Number(formData.trainer_id),
        session_date: formData.session_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        member_ids: formData.member_ids
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
          .map(Number)
      };

      const { data } = await api.post('/schedule', payload);
      setMessage(`Da tao buoi tap #${data.sessionId}`);
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Khong tao duoc buoi tap.');
    }
  };

  return (
    <section className="page-card">
      <h1>Tao buoi tap</h1>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          ID HLV
          <input name="trainer_id" value={formData.trainer_id} onChange={handleChange} required />
        </label>
        <label>
          Ngay tap
          <input type="date" name="session_date" value={formData.session_date} onChange={handleChange} required />
        </label>
        <label>
          Gio bat dau
          <input name="start_time" value={formData.start_time} onChange={handleChange} required />
        </label>
        <label>
          Gio ket thuc
          <input name="end_time" value={formData.end_time} onChange={handleChange} required />
        </label>
        <label>
          Danh sach member ID
          <input
            name="member_ids"
            value={formData.member_ids}
            onChange={handleChange}
            placeholder="1,2,3"
          />
        </label>
        {message ? <p className="success-text">{message}</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit" className="primary-button">
          Tao lich
        </button>
      </form>
    </section>
  );
}

export default CreateSession;
