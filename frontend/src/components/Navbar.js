// frontend/src/components/Navbar.js
import { Link, useNavigate,NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <nav className='navbar'>
      <div className='navbar-brand font'>
        <Link to='/'>The Folio</Link>
      </div>
      <div className="navbar-links">
  <div className="dropdown">
    <button className="dropdown-toggle">☰</button>
    <div className="dropdown-menu">
      <ul className="nav-menu">
                  <li className='font'><NavLink to="/home" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
                  <li className='font'><NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>About</NavLink></li>
                  <li className='font'><NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink></li>
                  {!user && (
        <>
          <Link to="/login" className='font'>Login</Link>
          <Link to="/register" className='font'>Register</Link>
        </>
      )}
      {user && (
        <>
          <Link to="/create-post" className='font'>Write Post</Link>
          <Link to="/profile" className='font'>Profile</Link>
          {user.role === 'admin' && <Link to="/admin" className='font'>Admin</Link>}
          <button onClick={handleLogout} className="btn-logout font">Logout</button>
        </>
      )}
      </ul>
    </div>
  </div>
</div>

    </nav>

  );
};
export default Navbar;