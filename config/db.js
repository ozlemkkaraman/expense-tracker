const mongoose = require("mongoose");

const connectDB = async (req, res) => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully");
    }
    catch(error){
        console.error("connection error: ", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;