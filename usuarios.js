const bcrypt = require('bcryptjs');

// Simulación de una base de datos en memoria
let usuarios = [];

// Función para registrar un usuario
function registrarUsuario(nombre, contraseña) {
  const id = usuarios.length + 1;
  const hash = bcrypt.hashSync(contraseña, 10); // Encriptar la contraseña
  const usuario = { id, nombre, contraseña: hash };
  usuarios.push(usuario);
  return usuario;
}

// Función para buscar un usuario por nombre
function buscarUsuarioPorNombre(nombre) {
  return usuarios.find(u => u.nombre === nombre);
}

module.exports = { registrarUsuario, buscarUsuarioPorNombre };