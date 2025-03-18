// import './NavBar.css';
// import { useContext } from 'react';
// import { Link } from 'react-router-dom'; 


// import { UserContext } from '../../contexts/UserContext';

// const NavBar = () => {
//   const { user, setUser } = useContext(UserContext);

//   const handleSignOut = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <nav>
//       {user ? (
//         <ul>
//           <li><Link to='/'>Home</Link></li>
//           <li><Link to='/reelTalk'>Reels</Link></li>
//           <li><Link to='/reels/new'>New Reel</Link></li>
//           <li><Link to='/trendingReels'>TrenDING🔥</Link></li>
//           <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
//         </ul>
//       ) : (
//         <ul>
//           <li><Link to='/'>Home</Link></li>
//           <li><Link to='/sign-in'>Sign In</Link></li>
//           <li><Link to='/sign-up'>Sign Up</Link></li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default NavBar;


import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import "./NavBar.css"; // ✅ Import styles

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false); // ✅ Controls mobile menu

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="navbar">
      {/* ✅ Logo Section */}
      <div className="nav">
        <h1>ReelTalk</h1>
      </div>

      {/* ✅ Menu Toggle for Mobile */}
      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* ✅ Navigation Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/reelTalk'>Reels</Link></li>
        {user && <li><Link to='/reels/new'>New Reel</Link></li>}
        <li><Link to='/trendingReels'>Trending🔥</Link></li>

        {user ? (
          <li><button onClick={handleSignOut} className="sign-out">Sign Out</button></li>
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
