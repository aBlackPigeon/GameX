import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import GameScreen from './pages/GameScreen';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/game/:gameId/:roomCode" element={<GameScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
