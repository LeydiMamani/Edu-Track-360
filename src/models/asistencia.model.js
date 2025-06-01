const mongoose = require('mongoose');

const asistenciaSchema = new mongoose.Schema({
    clase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clase',
        required: true
    },
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    estado: {
        type: String,
        enum: ['presente', 'ausente', 'tardanza', 'justificado'],
        default: 'ausente'
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    horaLlegada: Date,
    justificacion: {
        motivo: String,
        documentoUrl: String,
        aprobado: {
            type: Boolean,
            default: false
        }
    },
    registradoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    observaciones: String
});

// Índices
asistenciaSchema.index({ clase: 1, estudiante: 1 }, { unique: true });
asistenciaSchema.index({ estudiante: 1 });
asistenciaSchema.index({ fecha: 1 });
asistenciaSchema.index({ estado: 1 });

module.exports = mongoose.model('Asistencia', asistenciaSchema); 