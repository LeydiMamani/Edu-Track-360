const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['crear', 'editar', 'eliminar', 'otro'],
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    detalles: {
        type: mongoose.Schema.Types.Mixed
    }
});

module.exports = mongoose.model('Actividad', actividadSchema); 