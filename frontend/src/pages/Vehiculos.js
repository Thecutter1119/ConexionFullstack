import React, { useState, useEffect } from 'react';
import { Car, Plus, Edit, LogOut, Trash2, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehiculo, setEditingVehiculo] = useState(null);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    placa: '',
    tipo: 'carro',
    propietario: ''
  });

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const fetchVehiculos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/vehiculos');
      setVehiculos(response.data.data);
    } catch (error) {
      showAlert('Error al cargar vehículos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVehiculo) {
        await axios.put(`/api/vehiculos/${editingVehiculo.id}`, {
          propietario: formData.propietario
        });
        showAlert('Vehículo actualizado exitosamente');
      } else {
        await axios.post('/api/vehiculos', formData);
        showAlert('Vehículo registrado exitosamente');
      }
      
      setShowModal(false);
      setEditingVehiculo(null);
      setFormData({ placa: '', tipo: 'carro', propietario: '' });
      fetchVehiculos();
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error al procesar solicitud', 'error');
    }
  };

  const handleEdit = (vehiculo) => {
    setEditingVehiculo(vehiculo);
    setFormData({
      placa: vehiculo.placa,
      tipo: vehiculo.tipo,
      propietario: vehiculo.propietario
    });
    setShowModal(true);
  };

  const handleRegistrarSalida = async (vehiculo) => {
    if (window.confirm(`¿Confirmar salida del vehículo ${vehiculo.placa}?`)) {
      try {
        await axios.put(`/api/vehiculos/${vehiculo.id}`, {
          registrarSalida: true
        });
        showAlert('Salida registrada exitosamente');
        fetchVehiculos();
      } catch (error) {
        showAlert(error.response?.data?.message || 'Error al registrar salida', 'error');
      }
    }
  };

  const handleDelete = async (vehiculo) => {
    if (window.confirm(`¿Eliminar el registro del vehículo ${vehiculo.placa}?`)) {
      try {
        await axios.delete(`/api/vehiculos/${vehiculo.id}`);
        showAlert('Vehículo eliminado exitosamente');
        fetchVehiculos();
      } catch (error) {
        showAlert(error.response?.data?.message || 'Error al eliminar vehículo', 'error');
      }
    }
  };

  const openModal = () => {
    setEditingVehiculo(null);
    setFormData({ placa: '', tipo: 'carro', propietario: '' });
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('es-CO');
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
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <div className="card">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <h1 style={{ 
            color: '#212529',
            fontSize: '2rem',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Car size={32} />
            Gestión de Vehículos
          </h1>
          <button onClick={openModal} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} />
            Registrar Ingreso
          </button>
        </div>

        {vehiculos.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666' 
          }}>
            <h3>No hay vehículos registrados</h3>
            <p>Comienza registrando el primer vehículo</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Placa</th>
                  <th>Tipo</th>
                  <th>Propietario</th>
                  <th>Fecha Ingreso</th>
                  <th>Fecha Salida</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vehiculos.map((vehiculo) => (
                  <tr key={vehiculo.id}>
                    <td style={{ fontWeight: 'bold' }}>{vehiculo.placa}</td>
                    <td style={{ textTransform: 'capitalize' }}>{vehiculo.tipo}</td>
                    <td>{vehiculo.propietario}</td>
                    <td>{formatDate(vehiculo.fechaIngreso)}</td>
                    <td>{formatDate(vehiculo.fechaSalida)}</td>
                    <td>
                      <span className={`badge ${vehiculo.estado === 'dentro' ? 'badge-success' : 'badge-danger'}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                        {vehiculo.estado === 'dentro' ? (
                          <>
                            <CheckCircle size={14} />
                            Dentro
                          </>
                        ) : (
                          <>
                            <XCircle size={14} />
                            Fuera
                          </>
                        )}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          onClick={() => handleEdit(vehiculo)}
                          className="btn btn-secondary"
                          title="Editar"
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Edit size={16} />
                        </button>
                        {vehiculo.estado === 'dentro' && (
                          <button 
                            onClick={() => handleRegistrarSalida(vehiculo)}
                            className="btn btn-warning"
                            title="Registrar Salida"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <LogOut size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(vehiculo)}
                          className="btn btn-danger"
                          title="Eliminar"
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {editingVehiculo ? (
                  <>
                    <Edit size={24} />
                    Editar Vehículo
                  </>
                ) : (
                  <>
                    <Plus size={24} />
                    Registrar Vehículo
                  </>
                )}
              </h2>
              <button 
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Placa del Vehículo</label>
                <input
                  type="text"
                  name="placa"
                  value={formData.placa}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Ej: ABC123"
                  required
                  disabled={editingVehiculo}
                  style={{ textTransform: 'uppercase' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tipo de Vehículo</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                  disabled={editingVehiculo}
                >
                  <option value="carro">Carro</option>
                  <option value="moto">Moto</option>
                  <option value="camion">Camión</option>
                  <option value="bicicleta">Bicicleta</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Propietario</label>
                <input
                  type="text"
                  name="propietario"
                  value={formData.propietario}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Nombre del propietario"
                  required
                />
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '15px', 
                justifyContent: 'flex-end',
                marginTop: '25px'
              }}>
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingVehiculo ? 'Actualizar' : 'Registrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehiculos;