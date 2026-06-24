const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');

const app = express();

// CORS: permite el origen del frontend (configurable por variable de entorno)
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim());

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API E-commerce funcionando' });
});

// Diagnóstico temporal de conexión a la DB (quitar luego)
app.get('/api/_debug/db', async (req, res) => {
  const sequelize = require('./config/database');
  const env = {
    DB_HOST: process.env.DB_HOST || null,
    DB_PORT: process.env.DB_PORT || null,
    DB_NAME: process.env.DB_NAME || null,
    DB_USER: process.env.DB_USER || null,
    DB_PASSWORD_set: Boolean(process.env.DB_PASSWORD),
  };
  try {
    await sequelize.authenticate();
    res.json({ ok: true, env });
  } catch (e) {
    res.json({ ok: false, env, name: e.name, message: e.message, code: e.original && e.original.code });
  }
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
