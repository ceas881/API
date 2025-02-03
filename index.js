const express = require('express');
const { registrarUsuario, buscarUsuarioPorNombre } = require('./usuarios');
const { generarToken, verificarToken } = require('./auth');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

app.use(express.json());

// Ruta para registrar un usuario
app.post('/registrar', (req, res) => {
  const { nombre, contraseña } = req.body;
  if (!nombre || !contraseña) {
    return res.status(400).json({ mensaje: 'Nombre y contraseña son requeridos' });
  }

  const usuario = registrarUsuario(nombre, contraseña);
  res.status(201).json({ mensaje: 'Usuario registrado', usuario });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { nombre, contraseña } = req.body;
  const usuario = buscarUsuarioPorNombre(nombre);

  if (!usuario || !bcrypt.compareSync(contraseña, usuario.contraseña)) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  const token = generarToken(usuario);
  res.json({ mensaje: 'Inicio de sesión exitoso', token });
});

// Ruta protegida (solo accesible con token válido)
app.get('/modulo-protegido', verificarToken, (req, res) => {
  res.json({ mensaje: 'Bienvenido al módulo protegido', usuario: req.usuario });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${8080}`);
});