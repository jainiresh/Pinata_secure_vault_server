import express from 'express';
import cors from 'cors';
import { appConfig } from './config/appConfig.js';
import authRouter from './routes/authRouter.js';
import fileRouter from './routes/fiileRouter.js';
import multer from 'multer';
import userRouter from './routes/userRouter.js';
import pingUrl from './utils/upTimeHack.js';

const app = express();
app.use(cors());
app.use(express.json())

const upload = multer({
  storage: multer.memoryStorage()
})

app.use('/auth', upload.single('file'), authRouter);
app.use('/file', upload.single('file'), fileRouter)
app.use('/users', userRouter)

setInterval(pingUrl, 600000);

const port = appConfig.PORT;

app.listen(port, () => {
  console.log('Server listening on ' + port);
});
