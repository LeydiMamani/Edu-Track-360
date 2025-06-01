const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accion: {
        type: String,
        required: true,
        enum: ['crear_usuario', 'actualizar_usuario', 'eliminar_usuario', 'login', 'logout']
    },
    detalles: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Activity', activitySchema); 