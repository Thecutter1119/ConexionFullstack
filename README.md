# 🚗 Sistema de Control de Parqueadero

Sistema completo para la gestión de ingreso y salida de vehículos en un parqueadero, desarrollado con Node.js/Express en el backend y React en el frontend.

## 📋 Características

- ✅ **Backend con Node.js y Express**
- ✅ **Frontend con React**
- ✅ **API REST completa** (GET, POST, PUT, DELETE)
- ✅ **Navegación con múltiples rutas**
- ✅ **Estilos personalizados y modernos**
- ✅ **Interfaz responsive**
- ✅ **Gestión completa de vehículos**
- ✅ **Estadísticas en tiempo real**

## 🚀 Funcionalidades

### Backend (API REST)
- **GET /api/vehiculos** - Obtener todos los vehículos
- **GET /api/vehiculos/:id** - Obtener vehículo por ID
- **POST /api/vehiculos** - Registrar ingreso de vehículo
- **PUT /api/vehiculos/:id** - Actualizar vehículo o registrar salida
- **DELETE /api/vehiculos/:id** - Eliminar registro de vehículo
- **GET /api/estadisticas** - Obtener estadísticas del parqueadero

### Frontend (React)
- **🏠 Página de Inicio** - Dashboard con estadísticas generales
- **🚙 Gestión de Vehículos** - CRUD completo de vehículos
- **📊 Estadísticas** - Visualización de datos y reportes

## 📁 Estructura del Proyecto

```
Retoclase/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   └── Navbar.css
│       ├── pages/
│       │   ├── Home.js
│       │   ├── Vehiculos.js
│       │   └── Estadisticas.js
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
└── README.md
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### 1. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 2. Instalar dependencias del Frontend

```bash
cd frontend
npm install
```

## ▶️ Ejecución

### 1. Ejecutar el Backend

```bash
cd backend
npm start
# o para desarrollo con auto-reload:
npm run dev
```

El servidor backend estará disponible en: `http://localhost:5000`

### 2. Ejecutar el Frontend

```bash
cd frontend
npm start
```

El frontend estará disponible en: `http://localhost:3000`

## 🎯 Uso del Sistema

### Registrar Ingreso de Vehículo
1. Ir a la sección "Vehículos"
2. Hacer clic en "Registrar Ingreso"
3. Completar el formulario con placa, tipo y propietario
4. Confirmar el registro

### Registrar Salida de Vehículo
1. En la lista de vehículos, buscar el vehículo deseado
2. Hacer clic en el botón de "Registrar Salida" (🚪)
3. Confirmar la acción

### Ver Estadísticas
1. Ir a la sección "Estadísticas"
2. Visualizar datos en tiempo real sobre:
   - Vehículos dentro del parqueadero
   - Espacios disponibles
   - Distribución por tipo de vehículo
   - Ingresos recientes

## 🎨 Características Técnicas

### Backend
- **Express.js** para el servidor web
- **CORS** habilitado para comunicación con frontend
- **UUID** para generación de IDs únicos
- **Base de datos en memoria** (simulada)
- **Validaciones de datos**
- **Manejo de errores**

### Frontend
- **React 18** con hooks
- **React Router** para navegación
- **Axios** para comunicación con API
- **CSS personalizado** con gradientes y animaciones
- **Diseño responsive**
- **Interfaz moderna y intuitiva**

## 📱 Responsive Design

El sistema está optimizado para funcionar en:
- 💻 Computadores de escritorio
- 📱 Tablets
- 📱 Dispositivos móviles

## 🔧 Personalización

### Modificar Capacidad del Parqueadero
En `backend/server.js`, línea 120, cambiar el valor de capacidad:
```javascript
capacidadDisponible: 50 - vehiculosDentro // Cambiar 50 por la capacidad deseada
```

### Agregar Nuevos Tipos de Vehículo
En `frontend/src/pages/Vehiculos.js`, modificar las opciones del select:
```javascript
<option value="nuevo_tipo">🚛 Nuevo Tipo</option>
```

## 🤝 Contribución

Este proyecto fue desarrollado como parte de un reto académico. Las mejoras y sugerencias son bienvenidas.

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

## 👨‍💻 Autor

Desarrollado por: **Thecutter1119**
Fecha: **2024**

---

¡Gracias por usar el Sistema de Control de Parqueadero! 🚗✨