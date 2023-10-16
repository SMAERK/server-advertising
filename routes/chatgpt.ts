import express from 'express';
import * as controller from '../controllers/chat';

const router = express.Router();

router.post('/newChat', controller.ChatGPT);


export default router;