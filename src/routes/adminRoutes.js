const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { isAdmin } = require('../middleware/authMiddleware');

// Rutas protegidas para administrador
router.use(isAdmin);

// Rutas de cursos
router.get('/courses', courseController.getAllCourses);
router.get('/courses/new', courseController.getNewCourseForm);
router.post('/courses/new', courseController.createCourse);
router.get('/courses/edit/:id', courseController.getEditCourseForm);
router.post('/courses/edit/:id', courseController.updateCourse);
router.post('/courses/delete/:id', courseController.deleteCourse);

module.exports = router; 