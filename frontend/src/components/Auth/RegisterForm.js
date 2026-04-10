import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    role: 'MEMBER'
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
      await register(formData);
      setMessage('Dang ky thanh cong. Hay dang nhap de tiep tuc.');
      navigate('/login');
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Khong dang ky duoc.');
    }
  };

  return (
    <section className="page-card auth-card">
      <h1>Dang ky tai khoan</h1>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Ho ten
          <input name="full_name" value={formData.full_name} onChange={handleChange} required />
        </label>
        <label>
          So dien thoai
          <input name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Mat khau
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
          Vai tro
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="MEMBER">Hoi vien</option>
            <option value="TRAINER">Huynh luyen vien</option>
          </select>
        </label>
        {message ? <p className="success-text">{message}</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
        <button type="submit" className="primary-button">
          Tao tai khoan
        </button>
      </form>
    </section>
  );
}

export default RegisterForm;
