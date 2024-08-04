const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/doctor', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
// export default connectDB;
