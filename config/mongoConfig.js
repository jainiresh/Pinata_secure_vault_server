import { MongoClient, ServerApiVersion } from "mongodb";
import { appConfig } from "./appConfig";

const mongoClient = new MongoClient(appConfig.MONGO_DB_URI, {
    serverApi: {
        version : ServerApiVersion.v1,
        strict: true, 
        deprecationErrors: true
    }
}) ;

export async function connectMongoDb(){
    try {
        await mongoClient.connect();
        console.log("Mongo Db connection successful !")
    } catch (error) {
        console.log(error);
    }
}