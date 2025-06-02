const User = require('../models/User');
const Course = require('../models/Course');

// Dashboard del administrador
exports.dashboard = async (req, res) => {
    try {
        // Obtener estadísticas
        const [userStats, courseStats, recentUsers, courses] = await Promise.all([
            User.aggregate([
                {
                    $group: {
                        _id: null,
                        totalUsers: { $sum: 1 },
                        totalTeachers: {
                            $sum: { $cond: [{ $eq: ["$role", "teacher"] }, 1, 0] }
                        },
                        totalStudents: {
                            $sum: { $cond: [{ $eq: ["$role", "student"] }, 1, 0] }
                        }
                    }
                }
            ]),
            Course.countDocuments(),
            User.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('firstName lastName email role createdAt'),
            Course.find()
                .populate('teacher', 'firstName lastName')
                .sort({ createdAt: -1 })
                .limit(10)
        ]);

        const stats = {
            ...userStats[0],
            totalCourses: courseStats
        };

        res.render('admin/dashboard', {
            title: 'Panel de Administración',
            stats,
            recentUsers,
            courses
        });
    } catch (error) {
        console.error('Error en dashboard admin:', error);
        res.status(500).render('errors/500');
    }
};

// Listar usuarios
exports.listUsers = async (req, res) => {
    try {
        const users = await User.find()
            .sort({ createdAt: -1 });

        res.render('admin/users/list', {
            title: 'Gestión de Usuarios',
            users
        });
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        res.status(500).render('errors/500');
    }
};

// Mostrar formulario de crear usuario
exports.showCreateUser = (req, res) => {
    res.render('admin/users/create', {
        title: 'Crear Usuario'
    });
};

// Crear usuario
exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        const user = new User({
            firstName,
            lastName,
            email,
            password,
            role,
            username: email.split('@')[0]
        });

        await user.save();

        req.flash('success', 'Usuario creado exitosamente');
        res.redirect('/admin/users');
    } catch (error) {
        console.error('Error al crear usuario:', error);
        req.flash('error', 'Error al crear usuario');
        res.redirect('/admin/users/create');
    }
};

// Mostrar formulario de editar usuario
exports.showEditUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            req.flash('error', 'Usuario no encontrado');
            return res.redirect('/admin/users');
        }

        res.render('admin/users/edit', {
            title: 'Editar Usuario',
            user
        });
    } catch (error) {
        console.error('Error al mostrar formulario de edición:', error);
        res.status(500).render('errors/500');
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, role, active } = req.body;
        const userId = req.params.id;

        await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            email,
            role,
            active: active === 'true'
        });

        req.flash('success', 'Usuario actualizado exitosamente');
        res.redirect('/admin/users');
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        req.flash('error', 'Error al actualizar usuario');
        res.redirect(`/admin/users/edit/${req.params.id}`);
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        req.flash('success', 'Usuario eliminado exitosamente');
        res.redirect('/admin/users');
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        req.flash('error', 'Error al eliminar usuario');
        res.redirect('/admin/users');
    }
}; 