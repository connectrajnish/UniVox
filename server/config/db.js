const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });        
        console.log("Connected to Database :: MongoDB");
    } catch (err) {
        console.error("Error in connecting to DB: ", err);
    }
}

module.exports = connectDB;