
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css'; // Make sure this CSS file exists
import logo from '../../assets/logo.png'; //  Make sure this path is correct

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token'); // ✅ Remove token
    setUser(null);  //  Update user state
    navigate('/');  //  Redirect to home
  };

  return (
    <nav className="navbar">
      
      <div className="nav-logo">
        <h1>ReelTalk</h1>
      </div>

      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/reelTalk'>Reels</Link></li>
        {user && <li><Link to='/reels/new'>New Reel</Link></li>}
        <li><Link to='/trendingReels'>Trending🔥</Link></li>

        {user ? (
          <li>
            <button className="nav-signout" onClick={handleSignOut}>
              Log Out 🚪
            </button>
          </li>
        ) : (
          <>
            <li><Link to='/sign-in'>Sign In</Link></li>
            <li><Link to='/sign-up'>Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;