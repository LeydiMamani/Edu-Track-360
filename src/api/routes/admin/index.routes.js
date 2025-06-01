const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../../middleware/auth');
const dashboardController = require('../../controllers/admin/dashboard.controller');

// Aplicar middleware de autenticación a todas las rutas
router.use(isAuthenticated, isAdmin);

// Dashboard
router.get('/dashboard', dashboardController.getDashboard);

// Reportes (ruta simple por ahora)
router.get('/reportes', (req, res) => {
    res.render('admin/reportes', {
        title: 'Reportes',
        user: req.user,
        messages: req.flash()
    });
});

module.exports = router; 