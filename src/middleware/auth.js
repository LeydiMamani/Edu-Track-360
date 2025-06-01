const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Debes iniciar sesión para acceder');
    res.redirect('/auth/login');
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.rol === 'admin') {
        return next();
    }
    req.flash('error', 'No tienes permisos para acceder a esta sección');
    res.redirect('/');
};

module.exports = {
    isAuthenticated,
    isAdmin
}; 