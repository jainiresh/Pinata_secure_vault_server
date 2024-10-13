import mongoose from "mongoose";
import { mongooseClient } from "../config/mongooseConfig.js";
import { appConfig } from "../config/appConfig.js";


const KeyMetadataSchema = {
    encryptedAesKey: {
        type: String,
        required: true
    },
    iv: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    publicKey: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    }
}

mongooseClient();


const keyMetadataSchema = new mongoose.Schema( KeyMetadataSchema ,{
    collection: appConfig.KEY_METADATA_COLLECTION
});

export default mongoose.model('KeyMetaDataModel', keyMetadataSchema);