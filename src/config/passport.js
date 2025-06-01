const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const Activity = require('../models/activity.model');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        if (user.estado === 'inactivo') {
            return done(null, false, { message: 'Usuario inactivo' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }

        // Actualizar último acceso
        await user.actualizarUltimoAcceso();

        // Registrar actividad
        const actividad = new Activity({
            usuario: user._id,
            accion: 'login',
            detalles: `Inicio de sesión exitoso - ${user.email}`
        });
        await actividad.save();

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport; 