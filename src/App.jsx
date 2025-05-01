import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import * as reelService from './services/reelService'; 
import TrendingReels from './components/TrendingReels/TrendingReels.jsx';
import EditReel from './components/EditReel/EditReel.jsx';
import ReelList from './components/ReelList/ReelList.jsx';
import ReelDetails from './components/ReelDetails/ReelDetails.jsx';
import ReelForm from './components/ReelForm/ReelForm.jsx';

const App = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch reels when user is logged in
  useEffect(() => {
    const fetchReels = async () => {
      if (!user) {
        setReels([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const reelsData = await reelService.index();
        setReels(reelsData || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching reels:', err);
        setError('Failed to load reels');
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, [user]);

  const handleAddReel = async (reelData) => {
    try {
      const newReel = await reelService.create(reelData);
      if (newReel) {
        setReels(prevReels => [newReel, ...prevReels]);
        navigate('/reeltalk');
      }
    } catch (err) {
      console.error('Error creating reel:', err);
      alert('Failed to create reel. Please try again.');
    }
  };

  const handleDeleteReel = async (reelId) => {
    try {
      console.log('Deleting reel with ID:', reelId);
      const response = await reelService.deleteReel(reelId);
      console.log('Delete response:', response);
      
      if (response) {
        setReels(prevReels => prevReels.filter(reel => reel._id !== reelId));
        return true;
      }
      throw new Error('Failed to delete reel');
    } catch (error) {
      console.error('Error deleting reel:', error);
      alert('Failed to delete reel. Please try again later.');
      return false;
    }
  };

  if (userLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <TrendingReels /> : <Landing />} />
        {user ? (
          <>
            <Route path='/reeltalk' element={
              <ReelList 
                reels={reels} 
                setReels={setReels} 
                handleDeleteReel={handleDeleteReel}
                loading={loading}
                error={error}
              />
            } />
            <Route path='/reels/new' element={<ReelForm onSubmit={handleAddReel} />} />
            <Route path='/reels/:reelId' element={<ReelDetails handleDeleteReel={handleDeleteReel} />} />
            <Route path='/reels/:reelId/edit' element={<EditReel setReels={setReels} handleDeleteReel={handleDeleteReel} />} />
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

