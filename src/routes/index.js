const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

// Página de inicio
router.get('/', (req, res) => {
    if (req.session.user) {
        // Redirigir según rol
        switch (req.session.user.role) {
            case 'admin':
                return res.redirect('/admin/dashboard');
            case 'director':
                return res.redirect('/director/dashboard');
            case 'teacher':
                return res.redirect('/teacher/dashboard');
            case 'student':
                return res.redirect('/student/dashboard');
            case 'parent':
                return res.redirect('/parent/dashboard');
            case 'staff':
                return res.redirect('/staff/dashboard');
        }
    }
    
    // Si no está autenticado, mostrar página de inicio
    res.render('index', {
        title: 'Bienvenido a EduTrack360'
    });
});

module.exports = router; 