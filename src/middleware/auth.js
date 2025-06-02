// Middleware de autenticación
exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
};

// Middleware de autorización por rol
exports.hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/auth/login');
        }

        if (!roles.includes(req.session.user.role)) {
            return res.status(403).render('errors/403');
        }

        next();
    };
};

// Middleware para pasar datos del usuario a todas las vistas
exports.setLocals = (req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.isAuthenticated = !!req.session.user;
    next();
}; 