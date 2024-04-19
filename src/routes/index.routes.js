import express from 'express';
import feedbackRouter from './v1/feedback.routes';

const router = express.Router();

router.use('/v1/feedback', feedbackRouter);

export default router;
