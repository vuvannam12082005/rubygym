import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMembers() {
      try {
        const { data } = await api.get('/members');
        setMembers(data);
      } catch (requestError) {
        setError('Khong tai duoc danh sach hoi vien.');
      }
    }

    loadMembers();
  }, []);

  return (
    <section className="page-card">
      <h1>Danh sach hoi vien</h1>
      {error ? <p className="error-text">{error}</p> : null}
      <div className="list-grid">
        {members.map((member) => (
          <article key={member.id} className="list-card">
            <h3>{member.full_name}</h3>
            <p>Ngay tham gia: {String(member.join_date).slice(0, 10)}</p>
            <p>HLV: {member.trainer_name || 'Chua phan cong'}</p>
            <Link to={`/members/${member.id}`}>Xem chi tiet</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MemberList;
