const jwt = require('jsonwebtoken');
const { buscarUsuarioPorNombre } = require('./usuarios');

const SECRETO = 'mi_secreto_super_seguro'; // Clave secreta para firmar tokens

// Función para generar un token JWT
function generarToken(usuario) {
  return jwt.sign({ id: usuario.id, username: usuario.username }, SECRETO, {
    expiresIn: '1h', // El token expira en 1 hora
  });
}

// Middleware para verificar el token
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRETO, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
    req.usuario = decoded; // Almacenar la información del usuario en la solicitud
    next();
  });
}

module.exports = { generarToken, verificarToken };