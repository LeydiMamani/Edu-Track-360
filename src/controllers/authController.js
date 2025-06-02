const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Mostrar formulario de login
exports.showLogin = (req, res) => {
    res.render('auth/login', {
        title: 'Iniciar Sesión',
        error: req.flash('error')
    });
};

// Procesar login
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Buscar usuario por email y rol
        const user = await User.findOne({ email, role });
        if (!user) {
            req.flash('error', 'Credenciales incorrectas o rol no válido');
            return res.redirect('/auth/login');
        }

        // Verificar contraseña
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            req.flash('error', 'Credenciales incorrectas o rol no válido');
            return res.redirect('/auth/login');
        }

        // Verificar si el usuario está activo
        if (!user.active) {
            req.flash('error', 'Tu cuenta está desactivada. Contacta al administrador.');
            return res.redirect('/auth/login');
        }

        // Actualizar último login
        user.lastLogin = new Date();
        await user.save();

        // Guardar usuario en sesión
        req.session.user = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            profilePicture: user.profilePicture || '/images/default-avatar.png'
        };

        // Redirigir según rol
        switch (user.role) {
            case 'admin':
                res.redirect('/admin/dashboard');
                break;
            case 'teacher':
                res.redirect('/teacher/dashboard');
                break;
            case 'student':
                res.redirect('/student/dashboard');
                break;
            default:
                res.redirect('/');
        }
    } catch (error) {
        console.error('Error en login:', error);
        req.flash('error', 'Error al iniciar sesión');
        res.redirect('/auth/login');
    }
};

// Cerrar sesión
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    });
}; 