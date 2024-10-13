import e from 'express'
import { uploadFileController } from '../controllers/uploadFileController.js';
import { getDecryptedFileController, getFileKeys } from '../controllers/getFileController.js';

const fileRouter = e.Router();

fileRouter.post('/uploadFile', uploadFileController);
fileRouter.post('/getFile', getDecryptedFileController);
fileRouter.get('/fileKeys', getFileKeys)

export default fileRouter;