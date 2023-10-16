import express from 'express';
import * as controller from '../controllers/petitionPdf';

const router = express.Router();

router.post('/pdf', controller.savepetitionPDF);


export default router;