const express = require('express');
const router = express.Router();

// Importar rutas
const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin/index.routes');
const usuariosRoutes = require('./admin/usuarios.routes');

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de administración
router.use('/admin', adminRoutes);
router.use('/admin/usuarios', usuariosRoutes);

module.exports = router; 