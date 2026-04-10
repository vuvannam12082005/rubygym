import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

function ScheduleView({ mode }) {
  const params = useParams();
  const resourceId = mode === 'trainer' ? params.trainerId : params.memberId;
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSchedule() {
      try {
        const path = mode === 'trainer'
          ? `/schedule/trainer/${resourceId}`
          : `/schedule/member/${resourceId}`;
        const { data } = await api.get(path);
        setSessions(data);
      } catch (requestError) {
        setError('Khong tai duoc lich tap.');
      }
    }

    if (resourceId) {
      loadSchedule();
    }
  }, [mode, resourceId]);

  return (
    <section className="page-card">
      <h1>{mode === 'trainer' ? 'Lich tap cua HLV' : 'Lich tap cua hoi vien'}</h1>
      {error ? <p className="error-text">{error}</p> : null}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Ngay</th>
              <th>Bat dau</th>
              <th>Ket thuc</th>
              <th>Thong tin</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id}>
                <td>{String(session.session_date).slice(0, 10)}</td>
                <td>{String(session.start_time).slice(0, 5)}</td>
                <td>{String(session.end_time).slice(0, 5)}</td>
                <td>{session.members || session.trainer_name || 'Buoi tap'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ScheduleView;
