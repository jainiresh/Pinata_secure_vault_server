import mongoose from "mongoose";
import { mongooseClient } from "../config/mongooseConfig.js"
import { appConfig } from "../config/appConfig.js";


const UploadedFileSchema = {
    pinataUrl: {
        type: String,
        required: true,
        unique: true
    },
    encryptedAesKey: {
        type: String,
        required: true
    }
}

mongooseClient();

const pinataDetailsModel = new mongoose.Schema(UploadedFileSchema, {
    collection: appConfig.PINATA_URL_DETAILS_COLLECTION
})

export default mongoose.model('PinataDetails', pinataDetailsModel);