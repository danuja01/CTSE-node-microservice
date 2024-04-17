import {
    createFeedbackService,
    getAllFeedbackService,
    getFeedbackByIdService,
    UpdateFeedbackService,
    deleteFeedbackService
} from '@/services/feedback';
import { makeResponse } from '@/utils';
  
export const getAll = async (req, res) => {
    const feedbacks = await getAllFeedbackService(req.query);
    return makeResponse({ res, data: feedbacks, message: 'Feedbacks retrieved succesfully' });
};
  
export const getById = async (req, res) => {
    const feedback = await getFeedbackByIdService(req.params.id);
    return makeResponse({ res, data: feedback, message: 'Feedback retrieved succesfully' });
};
  
export const createFeedback = async (req, res) => {
    const feedback = await createFeedbackService(req.body);
    return makeResponse({ res, data: feedback, message: 'Feedback created successfully' });
};
  
export const updateFeedback = async (req, res) => {
    const updatedFeedback = await UpdateFeedbackService(req.params.id, req.body);
    return makeResponse({ res, data: updatedFeedback, message: 'Feedback updated successfully' });
};
  
export const removeFeedback = async (req, res) => {
    await deleteFeedbackService(req.params.id, req.user._id);
    return makeResponse({ res, message: 'Feedback deleted successfully' });
};