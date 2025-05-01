import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css'; // Make sure this CSS file exists
import logo from '../../assets/logo.png'; //  Make sure this path is correct

const NavBar = () => {
  const { user, signOut } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

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
        {user && (
          <li><Link to='/reelTalk'>Reels</Link></li>
        )}

        {user ? (
          <li>
            <button className="nav-signout" onClick={signOut}>
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