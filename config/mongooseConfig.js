import mongoose from "mongoose";
import { appConfig } from "./appConfig.js";

export async function mongooseClient() {
    try {
        await mongoose.connect(appConfig.MONGO_DB_URI, {
            dbName: appConfig.DATABASE_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Mongo DB connected !`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
