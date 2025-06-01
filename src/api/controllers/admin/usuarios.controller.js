const User = require('../../../models/user.model');
const Activity = require('../../../models/activity.model');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find().select('-password');
        res.render('admin/usuarios/index', {
            title: 'Gestión de Usuarios',
            user: req.user,
            usuarios,
            messages: req.flash()
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        req.flash('error', 'Error al cargar los usuarios');
        res.redirect('/admin/dashboard');
    }
};

// Mostrar formulario de crear usuario
const showCrearUsuario = (req, res) => {
    res.render('admin/usuarios/crear', {
        title: 'Crear Usuario',
        user: req.user,
        messages: req.flash()
    });
};

// Crear nuevo usuario
const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // Validar que el email no exista
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            req.flash('error', 'El email ya está registrado');
            return res.redirect('/admin/usuarios/crear');
        }

        // Crear el nuevo usuario
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({
            nombre,
            email,
            password: hashedPassword,
            rol,
            estado: 'activo'
        });

        await nuevoUsuario.save();

        // Registrar la actividad
        const actividad = new Activity({
            usuario: req.user._id,
            accion: 'crear_usuario',
            detalles: `Creó el usuario ${email}`
        });
        await actividad.save();

        req.flash('success', 'Usuario creado exitosamente');
        res.redirect('/admin/usuarios');
    } catch (error) {
        console.error('Error al crear usuario:', error);
        req.flash('error', 'Error al crear el usuario');
        res.redirect('/admin/usuarios/crear');
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, rol, estado } = req.body;

        const usuario = await User.findById(id);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Verificar si el nuevo email ya existe
        if (email !== usuario.email) {
            const emailExistente = await User.findOne({ email });
            if (emailExistente) {
                return res.status(400).json({
                    success: false,
                    message: 'El email ya está en uso'
                });
            }
        }

        // Actualizar usuario
        usuario.nombre = nombre;
        usuario.email = email;
        usuario.rol = rol;
        usuario.estado = estado;

        await usuario.save();

        // Registrar actividad
        const actividad = new Activity({
            usuario: req.user._id,
            accion: 'actualizar_usuario',
            detalles: `Usuario ${nombre} actualizado`
        });
        await actividad.save();

        res.json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                estado: usuario.estado
            }
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el usuario'
        });
    }
};

// Cambiar estado del usuario (activar/desactivar)
const cambiarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findById(id);

        if (!usuario) {
            req.flash('error', 'Usuario no encontrado');
            return res.redirect('/admin/usuarios');
        }

        // No permitir desactivar al usuario administrador principal
        if (usuario.email === 'admin@edutrack360.com') {
            req.flash('error', 'No se puede desactivar al administrador principal');
            return res.redirect('/admin/usuarios');
        }

        usuario.estado = usuario.estado === 'activo' ? 'inactivo' : 'activo';
        await usuario.save();

        // Registrar la actividad
        const actividad = new Activity({
            usuario: req.user._id,
            accion: 'cambiar_estado_usuario',
            detalles: `Cambió el estado de ${usuario.email} a ${usuario.estado}`
        });
        await actividad.save();

        req.flash('success', `Usuario ${usuario.estado === 'activo' ? 'activado' : 'desactivado'} exitosamente`);
        res.redirect('/admin/usuarios');
    } catch (error) {
        console.error('Error al cambiar estado del usuario:', error);
        req.flash('error', 'Error al cambiar el estado del usuario');
        res.redirect('/admin/usuarios');
    }
};

module.exports = {
    getUsuarios,
    showCrearUsuario,
    crearUsuario,
    updateUser,
    cambiarEstado
}; 