import { expect } from 'chai';
import sinon from 'sinon';
import * as FeedbackRepository from '@/repository/feedback';
import * as FeedbackService from '@/services/feedback';

describe('Feedback Service', function () {
  describe('createFeedbackService', function () {
    it('should create a new feedback', async function () {
      // Stub the createFeedback function
      const createFeedbackStub = sinon
        .stub(FeedbackRepository, 'createFeedback')
        .resolves({ _id: '123', rating: 5, review: 'Great service!' });

      const newFeedback = await FeedbackService.createFeedbackService();

      expect(createFeedbackStub.calledOnce).to.be.true;
      expect(newFeedback).to.deep.equal({ _id: '123', rating: 5, review: 'Great service!' });

      // Restore the stub
      createFeedbackStub.restore();
    });

    it('should throw an error if creating feedback fails', async function () {
      // Stub the createFeedback function to throw an error
      const createFeedbackStub = sinon
        .stub(FeedbackRepository, 'createFeedback')
        .rejects(new Error('Failed to create feedback'));

      const createFeedbackPromise = FeedbackService.createFeedbackService();

      await expect(createFeedbackPromise).to.be.rejectedWith(Error, 'Failed to create feedback');

      // Restore the stub
      createFeedbackStub.restore();
    });
  });

  describe('getAllFeedbackService', function () {
    it('should return all feedbacks', async function () {
      // Stub the getAllFeedbacks function
      const getAllFeedbacksStub = sinon.stub(FeedbackRepository, 'getAllFeedbacks').resolves([
        { _id: '1', rating: 5, review: 'Great service!' },
        { _id: '2', rating: 4, review: 'Good experience.' }
      ]);

      const feedbacks = await FeedbackService.getAllFeedbackService();

      //   expect(getAllFeedbacksStub.calledOnce).to.be.true;
      expect(feedbacks).to.deep.equal([
        { _id: '1', rating: 5, review: 'Great service!' },
        { _id: '2', rating: 4, review: 'Good experience.' }
      ]);

      // Restore the stub
      getAllFeedbacksStub.restore();
    });
  });

  describe('getFeedbackByIdService', function () {
    it('should return a feedback by ID', async function () {
      // Stub the getFeedbackById function
      const getFeedbackByIdStub = sinon
        .stub(FeedbackRepository, 'getFeedbackById')
        .resolves({ _id: '123', rating: 5, review: 'Great service!' });

      const feedback = await FeedbackService.getFeedbackByIdService('123');

      expect(getFeedbackByIdStub.calledOnceWithExactly('123')).to.be.true;
      expect(feedback).to.deep.equal({ _id: '123', rating: 5, review: 'Great service!' });

      // Restore the stub
      getFeedbackByIdStub.restore();
    });

    it('should return null if feedback is not found by ID', async function () {
      // Stub the getFeedbackById function to return null
      const getFeedbackByIdStub = sinon.stub(FeedbackRepository, 'getFeedbackById').resolves(null);

      const feedback = await FeedbackService.getFeedbackByIdService('nonexistentid');

      expect(getFeedbackByIdStub.calledOnceWithExactly('nonexistentid')).to.be.true;
      expect(feedback).to.be.null;

      // Restore the stub
      getFeedbackByIdStub.restore();
    });
  });

  describe('UpdateFeedbackService', function () {
    it('should update a feedback', async function () {
      // Stub the updateFeedbackById function
      const updateFeedbackByIdStub = sinon
        .stub(FeedbackRepository, 'updateFeedbackById')
        .resolves({ _id: '123', rating: 5, review: 'Updated review.' });

      const updatedFeedback = await FeedbackService.UpdateFeedbackService('123', { review: 'Updated review.' });

      expect(updateFeedbackByIdStub.calledOnceWithExactly('123', { review: 'Updated review.' })).to.be.true;
      expect(updatedFeedback).to.deep.equal({ _id: '123', rating: 5, review: 'Updated review.' });

      // Restore the stub
      updateFeedbackByIdStub.restore();
    });

    it('should return null if no update data is provided', async function () {
      // Stub the updateFeedbackById function to return null
      const updateFeedbackByIdStub = sinon.stub(FeedbackRepository, 'updateFeedbackById').resolves(null);

      const updatedFeedback = await FeedbackService.UpdateFeedbackService('123', {});

      expect(updateFeedbackByIdStub.calledOnceWithExactly('123', {})).to.be.true;
      expect(updatedFeedback).to.be.null;

      // Restore the stub
      updateFeedbackByIdStub.restore();
    });

    it('should return null if feedback is not found by ID', async function () {
      // Stub the updateFeedbackById function to return null
      const updateFeedbackByIdStub = sinon.stub(FeedbackRepository, 'updateFeedbackById').resolves(null);

      const updatedFeedback = await FeedbackService.UpdateFeedbackService('nonexistentid', {
        review: 'Updated review.'
      });

      expect(updateFeedbackByIdStub.calledOnceWithExactly('nonexistentid', { review: 'Updated review.' })).to.be.true;
      expect(updatedFeedback).to.be.null;

      // Restore the stub
      updateFeedbackByIdStub.restore();
    });
  });

  describe('deleteFeedbackService', function () {
    it('should delete a feedback', async function () {
      const feedbackData = { _id: '1212', rating: 5, review: 'Great service!' };

      // Stub the getFeedbackById function to return a feedback
      const getFeedbackByIdStub = sinon.stub(FeedbackRepository, 'getFeedbackById').resolves(feedbackData);

      // Stub the deleteFeedbackById function
      const deleteFeedbackByIdStub = sinon.stub(FeedbackRepository, 'deleteFeedbackById').resolves(feedbackData);

      const result = await FeedbackService.deleteFeedbackService('1212');

      expect(result).to.deep.equal(feedbackData);

      // Restore the stubs
      getFeedbackByIdStub.restore();
      deleteFeedbackByIdStub.restore();
    });

    it('should throw an error if feedback is not found by ID', async function () {
      // Stub the getFeedbackById function to return null
      const getFeedbackByIdStub = sinon.stub(FeedbackRepository, 'getFeedbackById').resolves(null);

      // Call the deleteFeedbackService function with a non-existent ID
      const deleteFeedbackPromise = FeedbackService.deleteFeedbackService('nonexistentid');

      // Assert that deleteFeedbackService throws an error with the correct message
      await expect(deleteFeedbackPromise).to.be.rejectedWith('Invalid feedback ID');

      // Restore the stub
      getFeedbackByIdStub.restore();
    });
  });
});
