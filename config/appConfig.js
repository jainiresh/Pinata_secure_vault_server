import dotenv from 'dotenv'
dotenv.config();

export const appConfig = {
    PINATA_GATEWAY_DOMAIN: process.env.PINATA_GATEWAY_DOMAIN ,
    PINATA_GATEWAY_PATH: process.env.PINATA_GATEWAY_PATH ,
    PINATA_JWT_KEY: process.env.PINATA_JWT_KEY,

    MONGO_DB_URI: process.env.MONGO_DB_URI,
    KEY_METADATA_COLLECTION: process.env.KEY_METADATA_COLLECTION,
    PINATA_URL_DETAILS_COLLECTION: process.env.PINATA_URL_DETAILS_COLLECTION,
    DATABASE_NAME: process.env.DATABASE_NAME,

    PORT: process.env.PORT
  };