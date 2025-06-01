const express = require('express');
const router = express.Router();
const estudianteDashboardController = require('../api/controllers/estudiante/dashboard.controller');
const { isAuthenticated, isEstudiante } = require('../middleware/auth.middleware');

// Middleware para verificar que sea estudiante
router.use(isAuthenticated, isEstudiante);

// Rutas del dashboard
router.get('/dashboard', estudianteDashboardController.getDashboard);

module.exports = router; 