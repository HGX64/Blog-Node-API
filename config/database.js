const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
    try {
        const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`;
        
        const conn = await mongoose.connect(uri);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        setTimeout(() => process.exit(1), 100);
    }
}

module.exports = connectDB;