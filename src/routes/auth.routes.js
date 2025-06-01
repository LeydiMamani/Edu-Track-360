const express = require('express');
const router = express.Router();
const authController = require('../api/controllers/auth/auth.controller');
const { isAuthenticated } = require('../middleware/auth.middleware');

// Rutas de autenticación
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', isAuthenticated, authController.logout);

// Ruta de redirección basada en rol
router.get('/dashboard', isAuthenticated, authController.redirectBasedOnRole);

module.exports = router; 