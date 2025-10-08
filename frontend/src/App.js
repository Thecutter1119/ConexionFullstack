import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vehiculos from './pages/Vehiculos';
import Estadisticas from './pages/Estadisticas';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;