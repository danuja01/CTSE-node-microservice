import Feedback from '@/models/feedback';
import logger from '@/utils/logger';

export const createFeedback = async (feedbackData) => {
  try {
    const newFeedback = await new Feedback(feedbackData).save();
    return newFeedback;
  } catch (err) {
    logger.error(`An error occurred when creating feedback - err: ${err.message}`);
    throw err;
  }
};

export const getAllFeedbacks = async ({ sort = { createdAt: -1 }, filter = {}, page = 1, limit = 10 }) => {
  try {
    const options = {
      page,
      limit,
      sort
    };

    const aggregateQuery = () => Feedback.aggregate([{ $match: filter }]);

    return (page ? await Feedback.aggregatePaginate(aggregateQuery(), options) : aggregateQuery()).catch((err) => {
      logger.error(`An error occurred when retrieving feedbacks - err: ${err.message}`);
      throw err;
    });
  } catch (err) {
    logger.error(`An error occurred when retrieving feedbacks - err: ${err.message}`);
    throw err;
  }
};

export const getFeedbackById = async (feedbackId) => {
  try {
    const feedback = await Feedback.findById(feedbackId).lean();
    if (!feedback) {
      logger.warn(`No feedback found with ID: ${feedbackId}`);
      return null;
    }
    return feedback;
  } catch (err) {
    logger.error(`An error occurred when retrieving the feedback by ID - err: ${err.message}`);
    throw err;
  }
};

export const updateFeedbackById = async (feedbackId, updateData) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, updateData, { new: true }).lean();
    if (!updatedFeedback) {
      logger.warn(`No feedback found with ID: ${feedbackId}`);
      return null;
    }
    return updatedFeedback;
  } catch (err) {
    logger.error(`An error occurred when updating the feedback - err: ${err.message}`);
    throw err;
  }
};

export const deleteFeedbackById = async (feedbackId) => {
  try {
    const result = await Feedback.findByIdAndDelete(feedbackId);
    if (!result) {
      logger.warn(`No feedback found with ID: ${feedbackId}`);
      return null;
    }
    return result;
  } catch (err) {
    logger.error(`An error occurred when deleting the feedback - err: ${err.message}`);
    throw err;
  }
};
