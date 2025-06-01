const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const { isAuthenticated, isAdmin, isDocente, isEstudiante } = require('./middleware/auth.middleware');

// Importar configuraciones
require('./config/passport');
const connectDB = require('./config/database');

// Crear aplicación Express
const app = express();

// Conectar a la base de datos
connectDB();

// Configurar motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin:admin.123@cluster0.xsi2hdp.mongodb.net/ProEduDB?retryWrites=true&w=majority',
        collectionName: 'sessions',
        ttl: 24 * 60 * 60 // 1 día en segundos
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 día
    }
}));

// Configurar flash messages
app.use(flash());

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Ruta principal
app.get('/', (req, res) => {
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
});

// Rutas
app.use('/auth', require('./routes/auth.routes'));
app.use('/admin', isAdmin, require('./routes/admin.routes'));
app.use('/docente', isDocente, require('./routes/docente.routes'));
app.use('/estudiante', isEstudiante, require('./routes/estudiante.routes'));

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('errors/404', {
        title: 'Página no encontrada'
    });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('errors/500', {
        title: 'Error del servidor'
    });
});

module.exports = app; 