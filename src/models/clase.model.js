const mongoose = require('mongoose');

const claseSchema = new mongoose.Schema({
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
    fecha: {
        type: Date,
        required: true
    },
    aula: {
        type: String,
        required: true
    },
    tema: {
        type: String,
        required: true
    },
    descripcion: String,
    estado: {
        type: String,
        enum: ['programada', 'en_curso', 'finalizada', 'cancelada'],
        default: 'programada'
    },
    estudiantes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    asistencia: [{
        estudiante: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        estado: {
            type: String,
            enum: ['presente', 'ausente', 'tardanza', 'justificado'],
            default: 'ausente'
        },
        hora: Date,
        observacion: String
    }],
    recursos: [{
        nombre: String,
        tipo: {
            type: String,
            enum: ['documento', 'presentacion', 'video', 'otro']
        },
        url: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Índices
claseSchema.index({ curso: 1, fecha: 1 });
claseSchema.index({ profesor: 1 });
claseSchema.index({ fecha: 1 });
claseSchema.index({ estado: 1 });

module.exports = mongoose.model('Clase', claseSchema); 