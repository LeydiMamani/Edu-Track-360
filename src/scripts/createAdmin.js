require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGODB_URI = 'mongodb+srv://admin:admin.123@cluster0.xsi2hdp.mongodb.net/ProEduDB?retryWrites=true&w=majority';

const createAdminUser = async () => {
    try {
        // Conectar a MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Conectado a MongoDB');

        // Datos del administrador
        const adminData = {
            firstName: 'Admin',
            lastName: 'Sistema',
            email: 'admin@edutrack360.com',
            password: 'admin123',
            role: 'admin',
            username: 'admin',
            active: true
        };

        // Verificar si ya existe
        const existingAdmin = await User.findOne({ 
            $or: [
                { email: adminData.email },
                { username: adminData.username }
            ]
        });

        if (existingAdmin) {
            console.log('El usuario administrador ya existe');
            console.log('Email:', adminData.email);
            console.log('Contraseña:', adminData.password);
            process.exit(0);
        }

        // Crear nuevo administrador
        const admin = new User(adminData);
        await admin.save();

        console.log('Usuario administrador creado exitosamente');
        console.log('Email:', adminData.email);
        console.log('Contraseña:', adminData.password);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

// Ejecutar la función
createAdminUser(); 