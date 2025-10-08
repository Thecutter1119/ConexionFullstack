const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos en memoria (simulada)
let vehiculos = [
  {
    id: '1',
    placa: 'ABC123',
    tipo: 'carro',
    propietario: 'Juan Pérez',
    fechaIngreso: new Date().toISOString(),
    fechaSalida: null,
    estado: 'dentro'
  },
  {
    id: '2',
    placa: 'XYZ789',
    tipo: 'moto',
    propietario: 'María García',
    fechaIngreso: new Date(Date.now() - 3600000).toISOString(),
    fechaSalida: new Date().toISOString(),
    estado: 'fuera'
  }
];

// Rutas de la API

// GET - Obtener todos los vehículos
app.get('/api/vehiculos', (req, res) => {
  try {
    res.json({
      success: true,
      data: vehiculos,
      total: vehiculos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener vehículos',
      error: error.message
    });
  }
});

// GET - Obtener un vehículo por ID
app.get('/api/vehiculos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = vehiculos.find(v => v.id === id);
    
    if (!vehiculo) {
      return res.status(404).json({
        success: false,
        message: 'Vehículo no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: vehiculo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener vehículo',
      error: error.message
    });
  }
});

// POST - Registrar ingreso de vehículo
app.post('/api/vehiculos', (req, res) => {
  try {
    const { placa, tipo, propietario } = req.body;
    
    // Validaciones
    if (!placa || !tipo || !propietario) {
      return res.status(400).json({
        success: false,
        message: 'Placa, tipo y propietario son requeridos'
      });
    }
    
    // Verificar si el vehículo ya está dentro
    const vehiculoExistente = vehiculos.find(v => v.placa === placa && v.estado === 'dentro');
    if (vehiculoExistente) {
      return res.status(400).json({
        success: false,
        message: 'El vehículo ya se encuentra dentro del parqueadero'
      });
    }
    
    const nuevoVehiculo = {
      id: uuidv4(),
      placa: placa.toUpperCase(),
      tipo,
      propietario,
      fechaIngreso: new Date().toISOString(),
      fechaSalida: null,
      estado: 'dentro'
    };
    
    vehiculos.push(nuevoVehiculo);
    
    res.status(201).json({
      success: true,
      message: 'Vehículo registrado exitosamente',
      data: nuevoVehiculo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al registrar vehículo',
      error: error.message
    });
  }
});

// PUT - Actualizar información de vehículo o registrar salida
app.put('/api/vehiculos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { propietario, registrarSalida } = req.body;
    
    const vehiculoIndex = vehiculos.findIndex(v => v.id === id);
    
    if (vehiculoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Vehículo no encontrado'
      });
    }
    
    const vehiculo = vehiculos[vehiculoIndex];
    
    // Si se solicita registrar salida
    if (registrarSalida) {
      if (vehiculo.estado === 'fuera') {
        return res.status(400).json({
          success: false,
          message: 'El vehículo ya ha salido del parqueadero'
        });
      }
      
      vehiculo.fechaSalida = new Date().toISOString();
      vehiculo.estado = 'fuera';
    }
    
    // Actualizar propietario si se proporciona
    if (propietario) {
      vehiculo.propietario = propietario;
    }
    
    vehiculos[vehiculoIndex] = vehiculo;
    
    res.json({
      success: true,
      message: registrarSalida ? 'Salida registrada exitosamente' : 'Vehículo actualizado exitosamente',
      data: vehiculo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar vehículo',
      error: error.message
    });
  }
});

// DELETE - Eliminar registro de vehículo
app.delete('/api/vehiculos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const vehiculoIndex = vehiculos.findIndex(v => v.id === id);
    
    if (vehiculoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Vehículo no encontrado'
      });
    }
    
    const vehiculoEliminado = vehiculos.splice(vehiculoIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Vehículo eliminado exitosamente',
      data: vehiculoEliminado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar vehículo',
      error: error.message
    });
  }
});

// Ruta de estadísticas
app.get('/api/estadisticas', (req, res) => {
  try {
    const vehiculosDentro = vehiculos.filter(v => v.estado === 'dentro').length;
    const vehiculosFuera = vehiculos.filter(v => v.estado === 'fuera').length;
    const totalVehiculos = vehiculos.length;
    
    res.json({
      success: true,
      data: {
        vehiculosDentro,
        vehiculosFuera,
        totalVehiculos,
        capacidadDisponible: 50 - vehiculosDentro // Asumiendo capacidad de 50
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// Ruta por defecto
app.get('/', (req, res) => {
  res.json({
    message: 'API del Sistema de Control de Parqueadero',
    version: '1.0.0',
    endpoints: {
      'GET /api/vehiculos': 'Obtener todos los vehículos',
      'GET /api/vehiculos/:id': 'Obtener vehículo por ID',
      'POST /api/vehiculos': 'Registrar ingreso de vehículo',
      'PUT /api/vehiculos/:id': 'Actualizar vehículo o registrar salida',
      'DELETE /api/vehiculos/:id': 'Eliminar registro de vehículo',
      'GET /api/estadisticas': 'Obtener estadísticas del parqueadero'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚗 Servidor backend ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 API disponible en http://localhost:${PORT}/api/vehiculos`);
});