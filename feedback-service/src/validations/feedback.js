import { Joi } from 'celebrate';

export const addFeedbackSchema = Joi.object({
    noOfStars: Joi.number().required(),
    comment: Joi.string().required()
});

export const feedbackIdSchema = {
  id: Joi.string().hex().length(24).required()
};

export const feedbackUpdateSchema = {
    noOfStars: Joi.number().required(),
    comment: Joi.string().required()
};