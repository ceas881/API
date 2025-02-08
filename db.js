// db.js
const mysql = require('mysql2');

// Configura la conexión a la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',       // Dirección del servidor MySQL
  user: 'root',            // Usuario de la base de datos
  password: 'Gohengy1', // Contraseña del usuario
  database: 'control_acceso', // Nombre de la base de datos
});

// Conectar a la base de datos
conexion.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a MySQL establecida');
  }
});

module.exports = conexion;