const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
};

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.rol === 'admin') {
        return next();
    }
    res.status(403).render('error', { 
        message: 'No tienes permisos para acceder a esta área'
    });
};

const isDocente = (req, res, next) => {
    if (req.isAuthenticated() && (req.user.rol === 'docente' || req.user.rol === 'admin')) {
        return next();
    }
    res.status(403).render('error', { 
        message: 'No tienes permisos para acceder a esta área'
    });
};

const isEstudiante = (req, res, next) => {
    if (req.isAuthenticated() && req.user.rol === 'estudiante') {
        return next();
    }
    res.status(403).render('error', { 
        message: 'No tienes permisos para acceder a esta área'
    });
};

module.exports = {
    isAuthenticated,
    isAdmin,
    isDocente,
    isEstudiante
}; 