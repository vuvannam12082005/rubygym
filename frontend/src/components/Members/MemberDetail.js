import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

function MemberDetail() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMember() {
      try {
        const { data } = await api.get(`/members/${id}`);
        setMember(data);
      } catch (requestError) {
        setError('Khong tai duoc thong tin hoi vien.');
      }
    }

    loadMember();
  }, [id]);

  return (
    <section className="page-card">
      <h1>Chi tiet hoi vien</h1>
      {error ? <p className="error-text">{error}</p> : null}
      {member ? (
        <div className="detail-grid">
          <p><strong>Ho ten:</strong> {member.full_name}</p>
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>So dien thoai:</strong> {member.phone}</p>
          <p><strong>Ngay tham gia:</strong> {String(member.join_date).slice(0, 10)}</p>
          <p><strong>Loyal:</strong> {member.is_loyal ? 'Co' : 'Khong'}</p>
          <p><strong>HLV:</strong> {member.trainer_name || 'Chua phan cong'}</p>
        </div>
      ) : null}
    </section>
  );
}

export default MemberDetail;
