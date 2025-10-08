import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Home, BarChart3, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Car size={24} style={{ marginRight: '8px' }} />
          Control Parqueadero
        </Link>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`navbar-item ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Home size={18} style={{ marginRight: '8px' }} />
            Inicio
          </Link>
          <Link 
            to="/vehiculos" 
            className={`navbar-item ${isActive('/vehiculos') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Car size={18} style={{ marginRight: '8px' }} />
            Vehículos
          </Link>
          <Link 
            to="/estadisticas" 
            className={`navbar-item ${isActive('/estadisticas') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <BarChart3 size={18} style={{ marginRight: '8px' }} />
            Estadísticas
          </Link>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;