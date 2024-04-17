import { moduleLogger } from '@sliit-foss/module-logger';
import { FeedBack } from '@/models';

const logger = moduleLogger('Feedback-Repository');

export const createFeedback = async (feedback) => {
  try {
    const newFeedback = await new FeedBack(feedback).save();
    return newFeedback;
  } catch (err) {
    logger.error(`An error occurred when creating the feedback - err: ${err.message}`);
    throw err;
  }
};

export const getAllFeedbacks = async ({ sort = {}, filter = {}, page = 1, limit = 10 }) => {
  try {
    const options = {
      page,
      limit
    };

    if (Object.keys(sort).length > 0) options.sort = sort;

    const aggregateQuery = () =>
      FeedBack.aggregate([
        {
          $match: filter
        }
      ]);

    return (page ? await FeedBack.aggregatePaginate(aggregateQuery(), options) : aggregateQuery()).catch((err) => {
      logger.error(`An error occurred when retrieving feedbacks - err: ${err.message}`);
      throw err;
    });
  } catch (err) {
    logger.error(`An error occurred when retrieving the feedback - err: ${err.message}`);
    throw err;
  }
};

export const getFeedbackById = async (feedbackId) => {
  try {
    const feedback = await FeedBack.find({ _id: feedbackId }).lean();
    if (!feedback) return null;

    return feedback;
  } catch (err) {
    logger.error(`An error occurred when retrieving the feedback - err: ${err.message}`);
    throw err;
  }
};

export const findOneAndUpdateFeedback = async (filters, data) => {
  try {
    const feedback = await FeedBack.findOneAndUpdate(filters, data, { new: true }).lean();
    if (!feedback) return null;

    return feedback;
  } catch (err) {
    logger.error(`An error occurred when updating the feedback - err: ${err.message}`);
    throw err;
  }
};

export const findOneAndRemoveFeedback = (filters) => {
    return FeedBack.findOneAndRemove(filters);
};