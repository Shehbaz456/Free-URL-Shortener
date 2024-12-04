import mongoose from "mongoose";

const connectDB =  async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host} `);
              
    } catch (error) {
        console.log("Error connection to mongoDB ", error.message);
        process.exit(1) // 1 for failure, 0 status code is success
        
    }
}
export default connectDB;