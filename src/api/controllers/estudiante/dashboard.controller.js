const Course = require('../../../models/course.model');
const Activity = require('../../../models/activity.model');

const estudianteDashboardController = {
    getDashboard: async (req, res) => {
        try {
            const estudianteId = req.user._id;

            // Obtener cursos del estudiante
            const cursos = await Course.find({ estudiantes: estudianteId })
                .populate('docente', 'nombre');

            // Obtener actividades recientes
            const actividades = await Activity.find({ usuario: estudianteId })
                .sort({ fecha: -1 })
                .limit(5);

            res.render('estudiante/dashboard', {
                title: 'Panel del Estudiante',
                user: req.user,
                stats: {
                    totalCursos: cursos.length,
                    cursosActivos: cursos.filter(c => c.estado === 'activo').length
                },
                cursos: cursos.map(curso => ({
                    nombre: curso.nombre,
                    codigo: curso.codigo,
                    docente: curso.docente ? curso.docente.nombre : 'No asignado',
                    estado: curso.estado
                })),
                actividades: actividades.map(act => ({
                    accion: act.accion,
                    detalles: act.detalles,
                    fecha: act.fecha.toLocaleDateString()
                })),
                currentRoute: '/estudiante/dashboard'
            });
        } catch (error) {
            console.error('Error en el dashboard de estudiante:', error);
            req.flash('error', 'Error al cargar el dashboard');
            res.redirect('/');
        }
    }
};

module.exports = estudianteDashboardController; 