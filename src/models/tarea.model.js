const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
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
    fechaAsignacion: {
        type: Date,
        default: Date.now
    },
    fechaEntrega: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        enum: ['individual', 'grupal'],
        default: 'individual'
    },
    estado: {
        type: String,
        enum: ['pendiente', 'en_revision', 'calificada'],
        default: 'pendiente'
    },
    puntajeMaximo: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    archivosPermitidos: [{
        type: String,
        enum: ['pdf', 'doc', 'docx', 'txt', 'jpg', 'png', 'zip']
    }],
    entregas: [{
        estudiante: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        fechaEntrega: {
            type: Date,
            default: Date.now
        },
        archivos: [{
            nombre: String,
            url: String,
            tipo: String
        }],
        comentarios: String,
        calificacion: {
            nota: Number,
            comentarios: String,
            fecha: Date
        }
    }],
    recursos: [{
        nombre: String,
        descripcion: String,
        url: String,
        tipo: String
    }]
});

// Índices
tareaSchema.index({ curso: 1 });
tareaSchema.index({ profesor: 1 });
tareaSchema.index({ fechaEntrega: 1 });
tareaSchema.index({ estado: 1 });
tareaSchema.index({ 'entregas.estudiante': 1 });

module.exports = mongoose.model('Tarea', tareaSchema); 