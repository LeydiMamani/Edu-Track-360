const noCache = (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
};

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Por favor inicia sesión para acceder');
    res.redirect('/auth/login');
};

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.rol === 'admin') {
        return next();
    }
    req.flash('error_msg', 'No tienes permisos para acceder a esta área');
    res.redirect('/auth/login');
};

const isDocente = (req, res, next) => {
    if (req.isAuthenticated() && req.user.rol === 'docente') {
        return next();
    }
    req.flash('error_msg', 'No tienes permisos para acceder a esta área');
    res.redirect('/auth/login');
};

const isEstudiante = (req, res, next) => {
    if (req.isAuthenticated() && req.user.rol === 'estudiante') {
        return next();
    }
    req.flash('error_msg', 'No tienes permisos para acceder a esta área');
    res.redirect('/auth/login');
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (req.isAuthenticated() && roles.includes(req.user.rol)) {
            return next();
        }
        req.flash('error_msg', 'No tienes permisos para acceder a esta área');
        res.redirect('/auth/login');
    };
};

module.exports = {
    noCache,
    isAuthenticated,
    isAdmin,
    isDocente,
    isEstudiante,
    checkRole
}; 