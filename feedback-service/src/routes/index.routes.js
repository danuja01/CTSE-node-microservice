import express from 'express';
import feedbackRouter from './feedback.routes';

const router = express.Router();

router.use('/feedback', feedbackRouter);

export default router;