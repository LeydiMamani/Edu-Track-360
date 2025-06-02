const Course = require('../models/Course');
const User = require('../models/User');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'firstName lastName email');
        res.render('admin/courses/index', { courses });
    } catch (error) {
        req.flash('error', 'Error al cargar los cursos');
        res.redirect('/admin/dashboard');
    }
};

exports.getNewCourseForm = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' });
        res.render('admin/courses/new', { teachers });
    } catch (error) {
        req.flash('error', 'Error al cargar el formulario');
        res.redirect('/admin/courses');
    }
};

exports.createCourse = async (req, res) => {
    try {
        const courseData = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description,
            teacher: req.body.teacher,
            schedule: req.body.schedule,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };

        const course = await Course.create(courseData);
        req.flash('success', 'Curso creado exitosamente');
        res.redirect('/admin/courses');
    } catch (error) {
        req.flash('error', 'Error al crear el curso');
        res.redirect('/admin/courses/new');
    }
};

exports.getEditCourseForm = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const teachers = await User.find({ role: 'teacher' });
        res.render('admin/courses/edit', { course, teachers });
    } catch (error) {
        req.flash('error', 'Error al cargar el curso');
        res.redirect('/admin/courses');
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const courseData = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description,
            teacher: req.body.teacher,
            schedule: req.body.schedule,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: req.body.status
        };

        await Course.findByIdAndUpdate(req.params.id, courseData);
        req.flash('success', 'Curso actualizado exitosamente');
        res.redirect('/admin/courses');
    } catch (error) {
        req.flash('error', 'Error al actualizar el curso');
        res.redirect(`/admin/courses/edit/${req.params.id}`);
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        req.flash('success', 'Curso eliminado exitosamente');
        res.redirect('/admin/courses');
    } catch (error) {
        req.flash('error', 'Error al eliminar el curso');
        res.redirect('/admin/courses');
    }
}; 