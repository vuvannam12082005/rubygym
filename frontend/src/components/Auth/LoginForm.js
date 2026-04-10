import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const dashboardByRole = {
  ADMIN: '/dashboard/admin',
  TRAINER: '/dashboard/trainer',
  MEMBER: '/dashboard/member'
};

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: 'admin@rubygym.com',
    password: 'admin123'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(formData);
      navigate(dashboardByRole[user.role] || '/');
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Khong dang nhap duoc.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-card auth-card">
      <h1>Dang nhap</h1>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Mat khau
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Dang xu ly...' : 'Dang nhap'}
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
