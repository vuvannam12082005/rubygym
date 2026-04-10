import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const roleLinks = {
  ADMIN: [
    { to: '/dashboard/admin', label: 'Dashboard Admin' },
    { to: '/trainers', label: 'Quan ly HLV' },
    { to: '/members', label: 'Quan ly hoi vien' },
    { to: '/schedule/create', label: 'Tao lich tap' },
    { to: '/evaluations', label: 'Danh gia' },
    { to: '/subscriptions', label: 'Goi tap' }
  ],
  TRAINER: [
    { to: '/dashboard/trainer', label: 'Dashboard HLV' },
    { to: '/trainers', label: 'Danh sach HLV' },
    { to: '/members', label: 'Hoi vien' },
    { to: '/schedule/create', label: 'Tao buoi tap' },
    { to: '/evaluations', label: 'Danh gia' },
    { to: '/subscriptions', label: 'Goi tap' }
  ],
  MEMBER: [
    { to: '/dashboard/member', label: 'Dashboard hoi vien' },
    { to: '/subscriptions', label: 'Tinh trang goi tap' },
    { to: '/subscriptions/new', label: 'Dang ky goi moi' },
    { to: '/evaluations', label: 'Danh gia hang thang' }
  ]
};

function Sidebar() {
  const { user } = useAuth();
  const links = roleLinks[user?.role] || [];

  return (
    <aside className="sidebar">
      <h2>Dieu huong</h2>
      <div className="sidebar-links">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
