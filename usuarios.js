const conexion = require('./db');
const bcrypt = require('bcryptjs'); // bcryptjs libreria para encriptar contraseñas

// Función para registrar un usuario
function registrarUsuario(username, email, password, callback) {
  const hash = bcrypt.hashSync(password, 10); // Encriptar la contraseña, El número 10 es el "salt" (nivel de seguridad)
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  conexion.query(query, [username, email, hash], (err, results) => {
    if (err) return callback(err);
    callback(null, { id: results.insertId, username, email });
  });
}

// Función para buscar un usuario por nombre o correo
function buscarUsuarioPorCredenciales(usernameOemail, callback) {
  const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
  conexion.query(query, [usernameOemail, usernameOemail], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null); // Usuario no encontrado
    callback(null, results[0]);
  });
}

module.exports = { registrarUsuario, buscarUsuarioPorCredenciales };