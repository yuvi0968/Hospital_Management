import mongoose from "mongoose";
const Db_Name = "HospitalDb"

export const connectDb = (async () => {
    try {
        const dbConnection = await mongoose.connect("mongodb://127.0.0.1:27017/HospitalDb");

        // console.log("MongoDb connection url is : ", dbConnection.connection.host);
    } catch (error) {
        console.log("MongoDb connection failed !!", error)
        process.exit(1);
    }
});

