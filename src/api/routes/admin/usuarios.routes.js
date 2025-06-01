const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../../../middleware/auth');
const {
    getUsuarios,
    showCrearUsuario,
    crearUsuario,
    cambiarEstado
} = require('../../controllers/admin/usuarios.controller');

// Rutas protegidas para administradores
router.use(isAuthenticated, isAdmin);

// Obtener todos los usuarios
router.get('/', getUsuarios);

// Mostrar formulario de crear usuario
router.get('/crear', showCrearUsuario);

// Crear nuevo usuario
router.post('/crear', crearUsuario);

// Cambiar estado del usuario (activar/desactivar)
router.post('/:id/estado', cambiarEstado);

module.exports = router; 