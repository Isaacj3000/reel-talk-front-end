import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import * as reelService from './services/reelService'; 
import TrendingReels from './components/TrendingReels/TrendingReels.jsx';
import EditReel from './components/EditReel/EditReel.jsx';
import ReelList from './components/ReelList/ReelList.jsx';
import ReelDetails from './components/ReelDetails/ReelDetails.jsx';
import ReelForm from './components/ReelForm/ReelForm.jsx';


const App = () => {
  const { user } = useContext(UserContext);
  const [reels, setReels] = useState([]);
  const navigate = useNavigate();

  // ✅ Handle Adding a New Reel
  const handleAddReel = async (reelData) => {
    const newReel = await reelService.create(reelData);
    if (newReel) {
      setReels(prevReels => [newReel, ...prevReels]);
      navigate('/reeltalk');
    }
  };

  const handleDeleteReel = async (reelId) => {
    console.log('reelId:', reelId);
    SetReels(reels.filter((reel) => reel._id !== reelId));
    navigate('/reeltalk');
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
            <Route path='/reels/:reelId' element={<ReelDetails  handleDeleteReel={handleDeleteReel}/>} />
            <Route path='/trendingReels' element={<TrendingReels />} />
            <Route path='/reels/:reelId/edit' element={<EditReel />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;

