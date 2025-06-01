const mongoose = require('mongoose');

const calificacionSchema = new mongoose.Schema({
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    profesor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tipo: {
        type: String,
        enum: ['examen', 'tarea', 'proyecto', 'participacion', 'otro'],
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: String,
    nota: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    comentarios: String,
    periodo: {
        type: String,
        required: true
    },
    peso: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 100
    }
});

// Índices
calificacionSchema.index({ estudiante: 1, curso: 1 });
calificacionSchema.index({ curso: 1 });
calificacionSchema.index({ profesor: 1 });
calificacionSchema.index({ fecha: 1 });

module.exports = mongoose.model('Calificacion', calificacionSchema); 