const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:admin.123@cluster0.xsi2hdp.mongodb.net/ProEduDB?retryWrites=true&w=majority', {
            dbName: process.env.DB_NAME || 'edutrack360'
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Cargar modelos
        require('../models/user.model');
        require('../models/course.model');
        require('../models/activity.model');

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB; 