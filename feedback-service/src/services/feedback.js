import {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    findOneAndUpdateFeedback,
    findOneAndRemoveFeedback
} from '@/repository/feedback';

export const createFeedbackService = async (feedbackId) => {
    const newFeedback = await createFeedback(feedbackId);
    return newFeedback;
};
  
export const getAllFeedbackService = async (filters) => {
    const feedbacks = await getAllFeedbacks(filters);
    return feedbacks;
};
  
export const getFeedbackByIdService = async (feedbackId) => {
    const feedback = await getFeedbackById(feedbackId);
    return feedback;
};

export const UpdateFeedbackService = async (filters, data) => {
    const updatedFeedback = await findOneAndUpdateFeedback(filters, data);
    return updatedFeedback;
};
  
export const deleteFeedbackService = async (feedbackId, userId) => {
    const feedback = await getFeedbackById({ _id: feedbackId });
    if (!feedback) throw new createError(404, 'Invalid feedback ID');
  
    return findOneAndRemoveFeedback({ _id: feedbackId });
};