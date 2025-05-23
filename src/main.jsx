
import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './contexts/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>  
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);