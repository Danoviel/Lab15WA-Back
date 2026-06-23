const jwt = require('jsonwebtoken');

// Verifica el token JWT del header Authorization: Bearer <token>
exports.authenticate = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No autenticado: token no proporcionado',
      data: null
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, nombre, email, rol }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
      data: null
    });
  }
};

// Restringe el acceso a los roles indicados
exports.authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.rol)) {
    return res.status(403).json({
      success: false,
      message: 'No autorizado: permisos insuficientes',
      data: null
    });
  }
  next();
};
