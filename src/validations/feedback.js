import { Joi } from 'celebrate';

// Schema to add a new feedback entry
export const addFeedbackSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().trim().required()
});

// Schema for validating a feedback ID (typically MongoDB ObjectId)
export const feedbackIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
}).required();

// Schema for updating existing feedback
export const feedbackUpdateSchema = Joi.object({
  rating: Joi.number().min(1).max(5).optional(),
  review: Joi.string().trim().optional()
}).or('rating', 'review');
