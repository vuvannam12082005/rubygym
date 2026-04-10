import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="topbar">
      <Link to="/" className="brand">
        RubyGYM
      </Link>
      <nav className="topbar-links">
        <NavLink to="/events">Su kien</NavLink>
        {isAuthenticated ? (
          <>
            <span className="user-chip">
              {user?.email} - {user?.role}
            </span>
            <button type="button" className="ghost-button" onClick={logout}>
              Dang xuat
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Dang nhap</NavLink>
            <NavLink to="/register">Dang ky</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
