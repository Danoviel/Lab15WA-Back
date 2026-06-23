const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const TOKEN_EXPIRES = '7d';

function signToken(user) {
  return jwt.sign(
    { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES }
  );
}

function publicUser(user) {
  return { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol };
}

// POST /api/auth/register  -> crea un usuario CUSTOMER
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, email y contraseña son requeridos',
        data: null
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres',
        data: null
      });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: 'El email ya está registrado',
        data: null
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, password: hash, rol: 'CUSTOMER' });

    const token = signToken(user);
    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      data: { token, user: publicUser(user) }
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ success: false, message: 'Error al registrar usuario', data: null });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos',
        data: null
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas', data: null });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas', data: null });
    }

    const token = signToken(user);
    res.json({
      success: true,
      message: 'Inicio de sesión correcto',
      data: { token, user: publicUser(user) }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, message: 'Error al iniciar sesión', data: null });
  }
};

// GET /api/auth/me  -> requiere authenticate
exports.me = async (req, res) => {
  res.json({ success: true, message: 'Usuario autenticado', data: { user: req.user } });
};
