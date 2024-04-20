import { moduleLogger } from '@sliit-foss/module-logger';
import Feedback from '@/models/feedback';

const logger = moduleLogger('Feedback-Repository');

export const createFeedback = async (feedback) => {
  try {
    const newFeedback = await new Feedback(feedback).save();
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
      Feedback.aggregate([
        {
          $match: filter
        }
      ]);

      const resultPromise = page ? Feedback.aggregatePaginate(aggregateQuery(), options) : Promise.resolve(aggregateQuery());

      return resultPromise.then(result => {
        return result;
      }).catch(err => {
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
    const feedback = await Feedback.find({ _id: feedbackId }).lean();
    if (!feedback) return null;

    return feedback;
  } catch (err) {
    logger.error(`An error occurred when retrieving the feedback - err: ${err.message}`);
    throw err;
  }
};

export const findOneAndUpdateFeedback = async (filters, data) => {
  try {
    const feedback = await Feedback.findOneAndUpdate({ _id: filters }, data, { new: true }).lean();
    if (!feedback) return null;

    return feedback;
  } catch (err) {
    logger.error(`An error occurred when updating the feedback - err: ${err.message}`);
    throw err;
  }
};

export const findOneAndRemoveFeedback = (filters) => {
    return Feedback.findOneAndDelete({ _id: filters });
};