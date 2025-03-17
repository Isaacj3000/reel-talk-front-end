// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';  // ❌ REMOVE `Router` from here

// import { UserContext } from './contexts/UserContext';
// import { useContext, useState, useEffect } from 'react';

// import NavBar from './components/NavBar/NavBar';
// import SignUpForm from './components/SignUpForm/SignUpForm';
// import SignInForm from './components/SignInForm/SignInForm';
// import Landing from './components/Landing/Landing';
// import Dashboard from './components/Dashboard/Dashboard';

// import * as reelService from './services/reelService';

// import ReelList from './components/ReelList/ReelList.jsx';
// import ReelDetails from './components/ReelDetails/ReelDetails.jsx';
// import ReelForm from './components/ReelForm/ReelForm.jsx';
// import { likeReel, createComment } from './services/reelService.jsx';

// const App = () => {
//   const { user } = useContext(UserContext);
//   const [reels, setReels] = useState([]);
//   const navigate = useNavigate();

//   const handleAddReel = async (reelData) => {
//     const newReel = await reelService.create(reelData);
//     if (newReel) {
//       setReels(prevReels => [newReel, ...prevReels]);
//       navigate('/reeltalk');  
//     }
//     setReels([newReel, ...reels]);
//   };

//   useEffect(() => {
//     const fetchReels = async () => {
//       const reelsData = await reelService.index();
//       console.log('Fetched Reels:', reelsData);
//       setReels(reelsData || []);
//     };

//     if (user) fetchReels();
//   }, [user]);

//   return (
//     <> 
//       <NavBar />
//       <Routes>
//         <Route path='/' element={user ? <Dashboard /> : <Landing />} />
//         {user ? (
//           <>
//             <Route path='/reeltalk' element={<ReelList reels={reels} />} />
//             <Route path='/reels/new' element={<ReelForm onSubmit={handleAddReel} />} />
//             <Route path='/reels/:reelId' element={<ReelDetails />} />
//           </>
//         ) : (
//           <>
//             {/* Non-user Routes */}
//             <Route path='/sign-up' element={<SignUpForm />} />
//             <Route path='/sign-in' element={<SignInForm />} />
//           </>
//         )}
//       </Routes>
//     </>
//   );
// };

// export default App;
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

import * as reelService from './services/reelService';

import ReelList from './components/ReelList/ReelList.jsx';
import ReelDetails from './components/ReelDetails/ReelDetails.jsx';
import ReelForm from './components/ReelForm/ReelForm.jsx';
import TrendingReels from './components/Trending/TrendingReels.jsx';

const App = () => {
  const { user } = useContext(UserContext);
  const [reels, setReels] = useState([]);
  const navigate = useNavigate();

  // ✅ Handle Adding a New Reel
  const handleAddReel = async (reelData) => {
    const newReel = await reelService.create(reelData);
    if (newReel) {
      setReels(prevReels => [newReel, ...prevReels]); // ✅ Fixes duplicate state update
      navigate('/reeltalk');
    }
  };

  // ✅ Fetch Reels When User Logs In
  useEffect(() => {
    const fetchReels = async () => {
      const reelsData = await reelService.index();
      console.log('Fetched Reels:', reelsData);
      setReels(reelsData || []);
    };

    if (user) fetchReels();
  }, [user]);

  return (
    <> 
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/reeltalk' element={<ReelList reels={reels} setReels={setReels} />} />
            <Route path='/reels/new' element={<ReelForm onSubmit={handleAddReel} />} />
            <Route path='/reels/:reelId' element={<ReelDetails />} />
            <Route path='/trendingReels' element={<TrendingReels />} />
          </>
        ) : (
          <>
            {/* Non-user Routes */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
