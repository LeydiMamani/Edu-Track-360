const Course = require('../../../models/course.model');
const User = require('../../../models/user.model');
const Activity = require('../../../models/activity.model');

// Obtener todos los cursos
const getCourses = async (req, res) => {
    try {
        const cursos = await Course.find()
            .populate('docente', 'nombre email')
            .populate('estudiantes', 'nombre email');

        const docentes = await User.find({ rol: 'docente', estado: 'activo' })
            .select('nombre email');

        res.render('admin/cursos', {
            user: req.user,
            currentRoute: '/admin/cursos',
            cursos,
            docentes
        });
    } catch (error) {
        req.flash('error', 'Error al cargar los cursos');
        res.redirect('/admin/dashboard');
    }
};

// Crear nuevo curso
const createCourse = async (req, res) => {
    try {
        const { nombre, codigo, descripcion, docente, fechaInicio, fechaFin, capacidadMaxima, horario } = req.body;

        // Verificar si el código ya existe
        const cursoExistente = await Course.findOne({ codigo });
        if (cursoExistente) {
            return res.status(400).json({
                success: false,
                message: 'El código del curso ya está en uso'
            });
        }

        // Crear el nuevo curso
        const nuevoCurso = new Course({
            nombre,
            codigo,
            descripcion,
            docente,
            fechaInicio,
            fechaFin,
            capacidadMaxima,
            horario: JSON.parse(horario)
        });

        await nuevoCurso.save();

        // Registrar actividad
        const actividad = new Activity({
            usuario: req.user._id,
            accion: 'crear_curso',
            detalles: `Curso ${nombre} (${codigo}) creado`
        });
        await actividad.save();

        res.status(201).json({
            success: true,
            message: 'Curso creado exitosamente',
            curso: await nuevoCurso.populate('docente', 'nombre email')
        });
    } catch (error) {
        console.error('Error al crear curso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear el curso'
        });
    }
};

// Actualizar curso
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, docente, fechaInicio, fechaFin, capacidadMaxima, horario, estado } = req.body;

        const curso = await Course.findById(id);
        if (!curso) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado'
            });
        }

        // Actualizar curso
        curso.nombre = nombre;
        curso.descripcion = descripcion;
        curso.docente = docente;
        curso.fechaInicio = fechaInicio;
        curso.fechaFin = fechaFin;
        curso.capacidadMaxima = capacidadMaxima;
        curso.horario = JSON.parse(horario);
        curso.estado = estado;

        await curso.save();

        // Registrar actividad
        const actividad = new Activity({
            usuario: req.user._id,
            accion: 'actualizar_curso',
            detalles: `Curso ${nombre} actualizado`
        });
        await actividad.save();

        res.json({
            success: true,
            message: 'Curso actualizado exitosamente',
            curso: await curso.populate('docente', 'nombre email')
        });
    } catch (error) {
        console.error('Error al actualizar curso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el curso'
        });
    }
};

// Eliminar curso
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const curso = await Course.findById(id);
        if (!curso) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado'
            });
        }

        // En lugar de eliminar, marcar como inactivo
        curso.estado = 'inactivo';
        await curso.save();

        // Registrar actividad
        const actividad = new Activity({
            usuario: req.user._id,
            accion: 'eliminar_curso',
            detalles: `Curso ${curso.nombre} desactivado`
        });
        await actividad.save();

        res.json({
            success: true,
            message: 'Curso desactivado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar curso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el curso'
        });
    }
};

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
}; 