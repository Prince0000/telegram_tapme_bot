import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import ClickPage from './components/ClickPage';
import Boost from './components/Boost';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} >
          <Route path='' element={<ClickPage/>}/>
          <Route path='/boost' element={<Boost/>}/>
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
