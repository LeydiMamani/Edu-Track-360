const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del curso es obligatorio']
    },
    codigo: {
        type: String,
        required: [true, 'El código del curso es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del curso es obligatoria']
    },
    docente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El docente es obligatorio']
    },
    estudiantes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    fechaFin: {
        type: Date,
        required: [true, 'La fecha de fin es obligatoria']
    },
    horario: [{
        dia: {
            type: String,
            enum: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
        },
        horaInicio: String,
        horaFin: String
    }],
    capacidadMaxima: {
        type: Number,
        required: [true, 'La capacidad máxima es obligatoria']
    }
});

// Middleware para validar fechas
courseSchema.pre('save', function(next) {
    if (this.fechaInicio >= this.fechaFin) {
        next(new Error('La fecha de inicio debe ser anterior a la fecha de fin'));
    }
    next();
});

// Método para verificar disponibilidad
courseSchema.methods.verificarDisponibilidad = function() {
    return this.estudiantes.length < this.capacidadMaxima;
};

// Método para agregar estudiante
courseSchema.methods.agregarEstudiante = function(estudianteId) {
    if (!this.verificarDisponibilidad()) {
        throw new Error('El curso está lleno');
    }
    if (this.estudiantes.includes(estudianteId)) {
        throw new Error('El estudiante ya está inscrito en este curso');
    }
    this.estudiantes.push(estudianteId);
    return this.save();
};

// Método para remover estudiante
courseSchema.methods.removerEstudiante = function(estudianteId) {
    const index = this.estudiantes.indexOf(estudianteId);
    if (index === -1) {
        throw new Error('El estudiante no está inscrito en este curso');
    }
    this.estudiantes.splice(index, 1);
    return this.save();
};

module.exports = mongoose.model('Course', courseSchema); 