const express = require('express');
const router = express.Router();
const { isAdmin, noCache } = require('../middleware/auth.middleware');
const dashboardController = require('../api/controllers/admin/dashboard.controller');
const usuariosController = require('../api/controllers/admin/usuarios.controller');
const cursosController = require('../api/controllers/admin/cursos.controller');

// Aplicar middleware de autenticación y caché a todas las rutas
router.use(isAdmin);
router.use(noCache);

// Dashboard
router.get('/dashboard', dashboardController.getDashboard);

// Usuarios
router.get('/usuarios', usuariosController.getUsuarios);
router.get('/usuarios/crear', usuariosController.showCrearUsuario);
router.post('/usuarios/crear', usuariosController.crearUsuario);
router.post('/usuarios/:id/estado', usuariosController.cambiarEstado);

// Cursos
router.get('/cursos', cursosController.getCourses);
router.post('/cursos', cursosController.createCourse);
router.put('/cursos/:id', cursosController.updateCourse);
router.delete('/cursos/:id', cursosController.deleteCourse);

// Reportes
router.get('/reportes', (req, res) => {
    res.render('admin/reportes', {
        user: req.user,
        currentRoute: '/admin/reportes'
    });
});

module.exports = router; 