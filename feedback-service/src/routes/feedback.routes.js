import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { Segments, celebrate } from 'celebrate';
import { feedbackIdSchema, addFeedbackSchema, feedbackUpdateSchema } from '@/validations/feedback';
import { createFeedback, getAll, getById, updateFeedback, removeFeedback } from '@/controllers/feedback';

const feedbackRouter = express.Router();

feedbackRouter.get('/', tracedAsyncHandler(getAll));
feedbackRouter.get('/:id', celebrate({ [Segments.PARAMS]: feedbackIdSchema }), tracedAsyncHandler(getById));
feedbackRouter.post('/', celebrate({ [Segments.BODY]: addFeedbackSchema }), tracedAsyncHandler(createFeedback));
feedbackRouter.patch('/:id', celebrate({ [Segments.PARAMS]: feedbackIdSchema, [Segments.BODY]: feedbackUpdateSchema }), tracedAsyncHandler(updateFeedback));
feedbackRouter.delete('/:id', celebrate({ [Segments.PARAMS]: feedbackIdSchema }), tracedAsyncHandler(removeFeedback));

export default feedbackRouter;