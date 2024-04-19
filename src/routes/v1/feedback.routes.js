import express from 'express';
import { Segments, celebrate } from 'celebrate';
import { createFeedback, getAll, getById, removeFeedback, updateFeedback } from '@/controllers/feedback';
import { addFeedbackSchema, feedbackIdSchema, feedbackUpdateSchema } from '@/validations/feedback';
import { tracedAsyncHandler } from '@sliit-foss/functions';

const feedbackRouter = express.Router();

feedbackRouter.get('/', tracedAsyncHandler(getAll));
feedbackRouter.get('/:id', celebrate({ [Segments.PARAMS]: feedbackIdSchema }), tracedAsyncHandler(getById));
feedbackRouter.post('/', celebrate({ [Segments.BODY]: addFeedbackSchema }), tracedAsyncHandler(createFeedback));
feedbackRouter.patch(
  '/:id',
  celebrate({ [Segments.PARAMS]: feedbackIdSchema, [Segments.BODY]: feedbackUpdateSchema }),
  tracedAsyncHandler(updateFeedback)
);
feedbackRouter.delete('/:id', celebrate({ [Segments.PARAMS]: feedbackIdSchema }), tracedAsyncHandler(removeFeedback));

export default feedbackRouter;
