import React, { useState, useEffect } from 'react';
import { BarChart3, Car, ParkingCircle, FileText, Users, TrendingUp, Clock, Building, Zap, Info } from 'lucide-react';
import axios from 'axios';

const Estadisticas = () => {
  const [estadisticas, setEstadisticas] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsResponse, vehiculosResponse] = await Promise.all([
        axios.get('/api/estadisticas'),
        axios.get('/api/vehiculos')
      ]);
      
      setEstadisticas(statsResponse.data.data);
      setVehiculos(vehiculosResponse.data.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getVehiculosPorTipo = () => {
    const tipos = {};
    vehiculos.forEach(vehiculo => {
      tipos[vehiculo.tipo] = (tipos[vehiculo.tipo] || 0) + 1;
    });
    return tipos;
  };

  const getVehiculosRecientes = () => {
    return vehiculos
      .sort((a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso))
      .slice(0, 5);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-CO');
  };

  const calcularTiempoPromedio = () => {
    const vehiculosSalidos = vehiculos.filter(v => v.fechaSalida);
    if (vehiculosSalidos.length === 0) return 'N/A';
    
    const tiempoTotal = vehiculosSalidos.reduce((total, vehiculo) => {
      const ingreso = new Date(vehiculo.fechaIngreso);
      const salida = new Date(vehiculo.fechaSalida);
      return total + (salida - ingreso);
    }, 0);
    
    const promedioMs = tiempoTotal / vehiculosSalidos.length;
    const horas = Math.floor(promedioMs / (1000 * 60 * 60));
    const minutos = Math.floor((promedioMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${horas}h ${minutos}m`;
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

  const vehiculosPorTipo = getVehiculosPorTipo();
  const vehiculosRecientes = getVehiculosRecientes();
  const tiempoPromedio = calcularTiempoPromedio();

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
          <BarChart3 size={48} />
          Estadísticas del Parqueadero
        </h1>

        {estadisticas && (
          <>
            {/* Estadísticas Principales */}
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
                  <ParkingCircle size={16} /> Espacios Libres
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
                  <Users size={16} /> Vehículos Salidos
                </div>
              </div>
            </div>

            {/* Estadísticas Adicionales */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px',
              marginTop: '30px'
            }}>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#212529' }}>
                  {Math.round((estadisticas.vehiculosDentro / 50) * 100)}%
                </div>
                <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <TrendingUp size={16} /> Ocupación
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#495057', fontSize: '1.5rem' }}>
                  {tiempoPromedio}
                </div>
                <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Clock size={16} /> Tiempo Promedio
                </div>
              </div>
            </div>
          </>
        )}

        {/* Vehículos por Tipo */}
        <div className="card" style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#212529', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Car size={24} /> Distribución por Tipo de Vehículo
          </h2>
          
          {Object.keys(vehiculosPorTipo).length === 0 ? (
            <p style={{ color: '#666', textAlign: 'center' }}>
              No hay datos disponibles
            </p>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '15px' 
            }}>
              {Object.entries(vehiculosPorTipo).map(([tipo, cantidad]) => (
                <div key={tipo} className="stat-card" style={{ padding: '15px' }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    marginBottom: '5px',
                    color: tipo === 'carro' ? '#212529' : 
                          tipo === 'moto' ? '#343a40' : 
                          tipo === 'camion' ? '#495057' : '#6c757d'
                  }}>
                    {cantidad}
                  </div>
                  <div style={{ 
                    textTransform: 'capitalize', 
                    fontWeight: '500',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <Car size={16} /> {tipo}s
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vehículos Recientes */}
        <div className="card" style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#212529', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={24} /> Ingresos Recientes
          </h2>
          
          {vehiculosRecientes.length === 0 ? (
            <p style={{ color: '#666', textAlign: 'center' }}>
              No hay vehículos registrados
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Tipo</th>
                    <th>Propietario</th>
                    <th>Fecha Ingreso</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiculosRecientes.map((vehiculo) => (
                    <tr key={vehiculo.id}>
                      <td style={{ fontWeight: 'bold' }}>{vehiculo.placa}</td>
                      <td style={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Car size={16} /> {vehiculo.tipo}
                      </td>
                      <td>{vehiculo.propietario}</td>
                      <td>{formatDate(vehiculo.fechaIngreso)}</td>
                      <td>
                        <span className={`badge ${vehiculo.estado === 'dentro' ? 'badge-success' : 'badge-danger'}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                          {vehiculo.estado === 'dentro' ? (
                            <>
                              <Car size={14} />
                              Dentro
                            </>
                          ) : (
                            <>
                              <Users size={14} />
                              Fuera
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Información del Sistema */}
        <div className="card" style={{ marginTop: '30px', backgroundColor: '#f8f9fa' }}>
          <h2 style={{ color: '#212529', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Info size={24} /> Información del Sistema
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '15px' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={18} />
              <strong>Capacidad Total:</strong> 50 vehículos
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} />
              <strong>Última Actualización:</strong> {new Date().toLocaleString('es-CO')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} />
              <strong>Total de Registros:</strong> {vehiculos.length}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} />
              <strong>Estado del Sistema:</strong> 
              <span style={{ color: '#212529', marginLeft: '5px' }}>Activo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;