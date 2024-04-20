import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { default as Feedback } from '@/models/feedback';
import * as FeedbackRepository from '@/repository/feedback';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Feedback Repository', function () {
  let mongoServer;

  beforeEach(async function () {
    await Feedback.deleteMany({});
  });

  describe('createFeedback', function () {
    it('should create a new feedback', async function () {
      const feedbackData = { rating: 5, review: 'Great service!' };
      const createdFeedback = await FeedbackRepository.createFeedback(feedbackData);
      expect(createdFeedback).to.have.property('_id');
      expect(createdFeedback.rating).to.equal(feedbackData.rating);
      expect(createdFeedback.review).to.equal(feedbackData.review);
    });

    it('should throw an error if required fields are missing', async function () {
      await expect(FeedbackRepository.createFeedback({ rating: 5 })).to.be.rejected;
      await expect(FeedbackRepository.createFeedback({ review: 'Great service!' })).to.be.rejected;
    });
  });

  describe('getAllFeedbacks', function () {
    it('should return all feedbacks', async function () {
      // Create some feedback data
      const feedbackData = [
        { rating: 5, review: 'Great service!' },
        { rating: 4, review: 'Good experience.' },
        { rating: 3, review: 'Average service.' }
      ];

      await Feedback.insertMany(feedbackData);

      // Call getAllFeedbacks function
      const allFeedbacks = await FeedbackRepository.getAllFeedbacks({});

      expect(allFeedbacks.docs).to.have.lengthOf(feedbackData.length);
    });
  });

  describe('getFeedbackById', function () {
    it('should return a feedback by ID', async function () {
      // Create a feedback
      const feedbackData = { rating: 5, review: 'Great service!' };
      const createdFeedback = await FeedbackRepository.createFeedback(feedbackData);

      const foundFeedback = await FeedbackRepository.getFeedbackById(createdFeedback._id);

      expect(foundFeedback._id).to.deep.equal(createdFeedback._id);
    });

    it('should return null if feedback is not found by ID', async function () {
      const foundFeedback = await FeedbackRepository.getFeedbackById('nonexistentid').catch((err) => {
        return null;
      });

      expect(foundFeedback).to.be.null;
    });
  });

  describe('updateFeedbackById', function () {
    it('should update a feedback by ID', async function () {
      // Create a feedback
      const feedbackData = { rating: 5, review: 'Great service!' };
      const createdFeedback = await FeedbackRepository.createFeedback(feedbackData);

      const updateData = { review: 'Excellent service!' };
      const updatedFeedback = await FeedbackRepository.updateFeedbackById(createdFeedback._id, updateData);

      expect(updatedFeedback.review).to.equal(updateData.review);
    });

    it('should return null if feedback is not found by ID', async function () {
      const updatedFeedback = await FeedbackRepository.updateFeedbackById('nonexistentid', {
        review: 'Excellent service!'
      }).catch((err) => {
        return null;
      });

      expect(updatedFeedback).to.be.null;
    });
  });

  describe('deleteFeedbackById', function () {
    it('should delete a feedback by ID', async function () {
      // Create a feedback
      const feedbackData = { rating: 5, review: 'Great service!' };
      const createdFeedback = await FeedbackRepository.createFeedback(feedbackData);

      const deletedFeedback = await FeedbackRepository.deleteFeedbackById(createdFeedback._id);

      expect(deletedFeedback._id).to.deep.equal(createdFeedback._id);

      // Check if the feedback exists in the database
      const foundFeedback = await Feedback.findById(createdFeedback._id);

      expect(foundFeedback).to.be.null;
    });

    it('should return null if feedback is not found by ID', async function () {
      // Delete feedback with a non-existent ID
      const deletedFeedback = await FeedbackRepository.deleteFeedbackById('nonexistentid').catch((err) => {
        return null;
      });

      expect(deletedFeedback).to.be.null;
    });
  });
});
