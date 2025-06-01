const Course = require('../../../models/course.model');
const Activity = require('../../../models/activity.model');

const docenteDashboardController = {
    getDashboard: async (req, res) => {
        try {
            const docenteId = req.user._id;

            // Obtener estadísticas
            const [cursos, totalEstudiantes, actividades] = await Promise.all([
                Course.find({ docente: docenteId }),
                Course.aggregate([
                    { $match: { docente: docenteId } },
                    { $unwind: '$estudiantes' },
                    { $group: { _id: null, total: { $sum: 1 } } }
                ]),
                Activity.find({ usuario: docenteId })
                .sort({ fecha: -1 })
                .limit(5)
            ]);

            res.render('docente/dashboard', {
                user: req.user,
                currentRoute: '/docente/dashboard',
                stats: {
                    totalCursos: cursos.length,
                    totalEstudiantes: totalEstudiantes[0]?.total || 0,
                    cursosActivos: cursos.filter(c => c.estado === 'activo').length
                },
                cursos: cursos.map(curso => ({
                    nombre: curso.nombre,
                    codigo: curso.codigo,
                    estudiantes: curso.estudiantes.length,
                    capacidad: curso.capacidadMaxima,
                    estado: curso.estado
                })),
                actividades: actividades.map(act => ({
                    accion: act.accion,
                    detalles: act.detalles,
                    fecha: act.fecha.toLocaleDateString()
                }))
            });
        } catch (error) {
            console.error('Error en el dashboard de docente:', error);
            req.flash('error', 'Error al cargar el dashboard');
            res.redirect('/');
        }
    }
};

module.exports = docenteDashboardController; 