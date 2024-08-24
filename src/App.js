import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import ClickPage from './components/ClickPage';
import Boost from './components/Boost';
import { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState('prince');
  useEffect(() => {
    // Retrieve Telegram username and log it to console
    if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        const user = tg.initDataUnsafe?.user;

        if (user) {
            setUsername(user.username);
            console.log(`Telegram Username: ${user.username}`);
        } else {
          setUsername('prince17');
            console.log('No Telegram user detected');
        }
    }
}, []);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} >
          <Route path='' element={<ClickPage user={username}/>}/>
          <Route path='/boost' element={<Boost user={username}/>}/>
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
