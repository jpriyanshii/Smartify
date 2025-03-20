import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard.jsx'
import Game from './pages/Game.jsx';
import Game2 from './pages/Game2.jsx';
import MindMaze from './pages/MindMaze.jsx';
import Signup from './pages/Signup.jsx';
import Forgot from './pages/Forgot.jsx';
import Layout from './pages/Layout.jsx';
import Gamess from './pages/Gamess.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/game" element={<Game/>}/>
        <Route path="/game2" element={<Game2/>}/>
        <Route path='/mindmaze' element={<MindMaze/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/games" element={<Gamess />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;