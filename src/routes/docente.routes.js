const express = require('express');
const router = express.Router();
const docenteDashboardController = require('../api/controllers/docente/dashboard.controller');
const { isAuthenticated, isDocente } = require('../middleware/auth.middleware');

// Middleware para verificar que sea docente
router.use(isAuthenticated, isDocente);

// Rutas del dashboard
router.get('/dashboard', docenteDashboardController.getDashboard);

module.exports = router; 