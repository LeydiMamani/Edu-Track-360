// Middleware para verificar si el usuario está autenticado
exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        req.flash('error', 'Debes iniciar sesión para acceder');
        res.redirect('/auth/login');
    }
};

// Middleware para verificar si el usuario es administrador
exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        req.flash('error', 'No tienes permisos para acceder a esta área');
        res.redirect('/');
    }
};

// Middleware para verificar si el usuario es profesor
exports.isTeacher = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'teacher') {
        next();
    } else {
        req.flash('error', 'No tienes permisos para acceder a esta área');
        res.redirect('/');
    }
};

// Middleware para verificar si el usuario es estudiante
exports.isStudent = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'student') {
        next();
    } else {
        req.flash('error', 'No tienes permisos para acceder a esta área');
        res.redirect('/');
    }
}; 