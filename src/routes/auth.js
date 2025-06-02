const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

// Rutas de autenticación
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', isAuthenticated, authController.logout);

module.exports = router; 