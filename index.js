const express = require('express');
const { registrarUsuario, buscarUsuarioPorCredenciales } = require('./usuarios');
const { generarToken, verificarToken } = require('./auth');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

app.use(express.json());

// Ruta para registrar un usuario
app.post('/registrar', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ mensaje: 'Nombre, correo y contraseña son requeridos' });
  }

  registrarUsuario(username, email, password, (err, usuario) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al registrar el usuario', error: err });
    }
    res.status(201).json({ mensaje: 'Usuario registrado', usuario });
  });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { usernameOemail, password } = req.body;
  if (!usernameOemail || !password) {
    return res.status(400).json({ mensaje: 'Nombre/Correo y contraseña son requeridos' });
  }

  buscarUsuarioPorCredenciales(usernameOemail, (err, usuario) => { // Buscar al usuario en la base de datos
    if (err) {
      return res.status(500).json({ mensaje: 'Error al buscar el usuario', error: err });
    }
    /*if (!usuario || !bcrypt.compareSync(password, usuario.password)) { // Comparar la contraseña ingresada con la contraseña encriptada en la base de datos
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });// Verificar si el usuario existe y si la contraseña es correcta
    }*/
      // Verificar si el usuario existe
      if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
  
      // Comparar la contraseña proporcionada con la contraseña encriptada
      if (!bcrypt.compareSync(password, usuario.password)) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

    const token = generarToken(usuario); // Si todo es correcto, generar un token para el usuario  
    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  });
});

// Ruta protegida (solo accesible con token válido)
app.get('/modulo-protegido', verificarToken, (req, res) => {
  res.json({ mensaje: 'Bienvenido al módulo protegido', usuario: req.usuario });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});