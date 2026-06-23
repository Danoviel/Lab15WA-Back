// Punto de entrada para Vercel (serverless): exporta la app Express como handler.
// En local se sigue usando src/server.js (npm start / npm run dev) con app.listen.
const app = require('./src/app');

module.exports = app;
