import dotenv from 'dotenv';
import path from 'path';
import * as formData from 'express-form-data';
import os from 'os';
import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chatgpt';
import pdfRouter from './routes/petitionPdf'
import { FirebaseClient } from './models/FirebaseClient';
dotenv.config({ path: path.join(process.cwd(), '.env') });


const config = {
  uploadDir: os.tmpdir(),
  autoClean: true,
}

FirebaseClient.bootstrap();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(formData.parse(config))
app.use(formData.format())
app.use(formData.union())

//Routers
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/create', pdfRouter)


app.get('/', (req, res) => res.send('Api Raudoc - Dev is here!'))

app.listen(process.env.PORT, function() {
  console.log(`Server up and running @ ${process.env.PORT}`);
})
