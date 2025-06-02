const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');


// Cargar variables de entorno
dotenv.config();

const app = express();

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());

// Configuración de EJS y layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// URI de MongoDB
const MONGODB_URI = 'mongodb+srv://admin:admin.123@cluster0.xsi2hdp.mongodb.net/SystemEdu?retryWrites=true&w=majority';

// Configuración de sesión
app.use(session({
    secret: 'edutrack360_secret_key_2024',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGODB_URI
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

// Configuración de flash messages
app.use(flash());

// Variables globales
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user || null;
    res.locals.isAuthenticated = !!req.session.user;
    res.locals.style = '';
    next();
});

// Conexión a MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/chatbot', require('./routes/chatbot'));
// TODO: Implementar estas rutas
// app.use('/teacher', require('./routes/teacher'));
// app.use('/student', require('./routes/student'));

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('errors/404', {
        title: 'Página no encontrada',
        style: ''
    });
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
}); 