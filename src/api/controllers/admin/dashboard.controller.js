const User = require('../../../models/user.model');
const Activity = require('../../../models/activity.model');

const getDashboard = async (req, res) => {
    try {
        // Obtener estadísticas
        const stats = {
            totalUsuarios: await User.countDocuments(),
            totalCursos: 0, // Por implementar
            docentesActivos: await User.countDocuments({ rol: 'docente', estado: 'activo' }),
            estudiantesActivos: await User.countDocuments({ rol: 'estudiante', estado: 'activo' })
        };

        // Obtener actividades recientes
        const actividades = await Activity.find()
            .populate('usuario', 'nombre email')
            .sort({ fecha: -1 })
            .limit(10);

        res.render('admin/dashboard', {
            title: 'Dashboard Administrativo',
            user: req.user,
            stats,
            actividades,
            messages: req.flash()
        });
    } catch (error) {
        console.error('Error en el dashboard:', error);
        req.flash('error', 'Error al cargar el dashboard');
        res.redirect('/');
    }
};

module.exports = {
    getDashboard
}; 