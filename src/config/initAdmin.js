require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user.model');

const createAdminUser = async () => {
    try {
        // Conectar a MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:admin.123@cluster0.xsi2hdp.mongodb.net/ProEduDB?retryWrites=true&w=majority', {
            dbName: process.env.DB_NAME || 'edutrack360'
        });

        // Verificar si ya existe un usuario admin
        const adminExists = await User.findOne({ email: 'admin@edutrack360.com' });

        if (adminExists) {
            console.log('El usuario administrador ya existe');
            process.exit(0);
        }

        // Crear usuario admin
        const adminUser = new User({
            nombre: 'Administrador',
            email: 'admin@edutrack360.com',
            password: 'admin123',
            rol: 'admin',
            estado: 'activo'
        });

        await adminUser.save();
        console.log('Usuario administrador creado exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error al crear usuario administrador:', error);
        process.exit(1);
    }
};

createAdminUser(); 