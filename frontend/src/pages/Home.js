import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, BarChart3, ParkingCircle, Users, Building, Zap, FileText, Shield } from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEstadisticas();
  }, []);

  const fetchEstadisticas = async () => {
    try {
      const response = await axios.get('/api/estadisticas');
      setEstadisticas(response.data.data);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <div className="card">
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '30px', 
          color: '#212529',
          fontSize: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <Car size={48} />
          Sistema de Control de Parqueadero
        </h1>
        
        <p style={{ 
          textAlign: 'center', 
          fontSize: '1.2rem', 
          color: '#666', 
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          Bienvenido al sistema de gestión de vehículos. Controla el ingreso y salida 
          de vehículos de manera eficiente y organizada.
        </p>

        {estadisticas && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number" style={{ color: '#212529' }}>
                {estadisticas.vehiculosDentro}
              </div>
              <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Car size={16} /> Vehículos Dentro
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number" style={{ color: '#343a40' }}>
                {estadisticas.capacidadDisponible}
              </div>
              <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <ParkingCircle size={16} /> Espacios Disponibles
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number" style={{ color: '#495057' }}>
                {estadisticas.totalVehiculos}
              </div>
              <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <FileText size={16} /> Total Registros
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number" style={{ color: '#6c757d' }}>
                {estadisticas.vehiculosFuera}
              </div>
              <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Users size={16} /> Vehículos Fuera
              </div>
            </div>
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginTop: '40px'
        }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#212529', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Car size={24} /> Gestión de Vehículos
            </h3>
            <p style={{ color: '#6c757d', marginBottom: '20px' }}>
              Registra el ingreso y salida de vehículos, actualiza información 
              y mantén un control completo del parqueadero.
            </p>
            <Link to="/vehiculos" className="btn btn-primary">
              Ir a Vehículos
            </Link>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#212529', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <BarChart3 size={24} /> Estadísticas
            </h3>
            <p style={{ color: '#6c757d', marginBottom: '20px' }}>
              Visualiza estadísticas detalladas sobre la ocupación del parqueadero 
              y el historial de vehículos.
            </p>
            <Link to="/estadisticas" className="btn btn-secondary">
              Ver Estadísticas
            </Link>
          </div>
        </div>

        <div className="card" style={{ marginTop: '30px', backgroundColor: '#f8f9fa' }}>
          <h3 style={{ color: '#212529', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={24} /> Características del Sistema
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '15px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} />
              <strong>Control de Acceso:</strong> Registro seguro de ingreso y salida
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={18} />
              <strong>Interfaz Moderna:</strong> Diseño responsive y fácil de usar
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} />
              <strong>Tiempo Real:</strong> Información actualizada al instante
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} />
              <strong>Reportes:</strong> Estadísticas detalladas y útiles
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;