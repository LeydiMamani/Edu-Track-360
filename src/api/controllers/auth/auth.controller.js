const passport = require('passport');
const User = require('../../../models/user.model');
const Activity = require('../../../models/activity.model');

const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        return redirectBasedOnRole(req, res);
    }
    res.render('auth/login', {
        error: req.flash('error'),
        error_msg: req.flash('error_msg'),
        success_msg: req.flash('success_msg'),
        layout: false
    });
};

const postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Error en autenticación:', err);
            req.flash('error_msg', 'Error al iniciar sesión');
            return res.redirect('/auth/login');
        }
        
        if (!user) {
            req.flash('error_msg', info.message || 'Credenciales inválidas');
            return res.redirect('/auth/login');
        }

        req.logIn(user, async (err) => {
            if (err) {
                console.error('Error en login:', err);
                req.flash('error_msg', 'Error al iniciar sesión');
                return res.redirect('/auth/login');
            }

            // Registrar actividad
            const actividad = new Activity({
                usuario: user._id,
                accion: 'login',
                detalles: `Inicio de sesión exitoso - ${user.email}`
            });
            await actividad.save();

            // Actualizar último acceso
            await user.actualizarUltimoAcceso();

            // Redirigir según el rol
            redirectBasedOnRole(req, res);
        });
    })(req, res, next);
};

const logout = async (req, res) => {
    // Registrar actividad de logout
    if (req.user) {
        const actividad = new Activity({
            usuario: req.user._id,
            accion: 'logout',
            detalles: `Cierre de sesión - ${req.user.email}`
        });
        await actividad.save();
    }
    
    req.logout((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.redirect('/');
        }
        req.flash('success_msg', 'Has cerrado sesión exitosamente');
        res.redirect('/auth/login');
    });
};

const redirectBasedOnRole = (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    switch (req.user.rol) {
        case 'admin':
            res.redirect('/admin/dashboard');
            break;
        case 'docente':
            res.redirect('/docente/dashboard');
            break;
        case 'estudiante':
            res.redirect('/estudiante/dashboard');
            break;
        default:
            res.redirect('/auth/login');
    }
};

module.exports = {
    getLogin,
    postLogin,
    logout,
    redirectBasedOnRole
}; 