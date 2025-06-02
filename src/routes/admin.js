const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const courseController = require('../controllers/courseController');
const { isAuthenticated, hasRole } = require('../middleware/auth');

// Middleware para verificar rol de administrador
router.use(isAuthenticated, hasRole('admin'));

// Dashboard
router.get('/dashboard', adminController.dashboard);

// Gestión de usuarios
router.get('/users', adminController.listUsers);
router.get('/users/create', adminController.showCreateUser);
router.post('/users/create', adminController.createUser);
router.get('/users/edit/:id', adminController.showEditUser);
router.post('/users/edit/:id', adminController.updateUser);
router.get('/users/delete/:id', adminController.deleteUser);

// Gestión de cursos
router.get('/courses', courseController.getAllCourses);
router.get('/courses/new', courseController.getNewCourseForm);
router.post('/courses/new', courseController.createCourse);
router.get('/courses/edit/:id', courseController.getEditCourseForm);
router.post('/courses/edit/:id', courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);

module.exports = router; 