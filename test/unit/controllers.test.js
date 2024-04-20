import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { createFeedback, getAll, getById, removeFeedback, updateFeedback } from '@/controllers/feedback';
import * as feedbackService from '@/services/feedback';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Feedback Controller', function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('getAll', function () {
    it('should return all feedbacks', async function () {
      const feedbacks = [
        { _id: '1', rating: 5, review: 'Great service!' },
        { _id: '2', rating: 4, review: 'Good experience.' }
      ];
      const req = { query: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      // Stubbing the getAllFeedbackService function
      sandbox.stub(feedbackService, 'getAllFeedbackService').resolves(feedbacks);

      // Calling the controller function with the stubbed service
      await getAll(req, res);

      // Assertions
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal({
        data: feedbacks,
        message: 'Feedbacks retrieved successfully'
      });
    });
  });

  describe('getById', function () {
    it('should return a feedback by ID', async function () {
      const feedback = { _id: '1', rating: 5, review: 'Great service!' };

      const req = { params: { id: '1' } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      sandbox.stub(feedbackService, 'getFeedbackByIdService').resolves(feedback);

      await getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal({ data: feedback, message: 'Feedback retrieved successfully' });
    });
  });

  describe('createFeedback', function () {
    it('should create a new feedback', async function () {
      const feedback = { _id: '1', rating: 5, review: 'Great service!' };

      const createFeedbackServiceStub = sandbox.stub(feedbackService, 'createFeedbackService').resolves(feedback);

      const req = { body: feedback };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      await createFeedback(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal({ data: feedback, message: 'Feedback created successfully' });
      expect(createFeedbackServiceStub.calledOnceWithExactly(feedback)).to.be.true;
    });
  });

  describe('updateFeedback', function () {
    it('should update a feedback', async function () {
      const feedbackId = '1';
      const updatedFeedback = { _id: feedbackId, rating: 4, review: 'Updated review' };

      const updateFeedbackServiceStub = sandbox
        .stub(feedbackService, 'UpdateFeedbackService')
        .resolves(updatedFeedback);

      const req = { params: { id: feedbackId }, body: updatedFeedback };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      await updateFeedback(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal({
        data: updatedFeedback,
        message: 'Feedback updated successfully'
      });
      expect(updateFeedbackServiceStub.calledOnceWithExactly(feedbackId, updatedFeedback)).to.be.true;
    });
  });

  describe('removeFeedback', function () {
    it('should delete a feedback', async function () {
      const feedbackId = '1';

      const deleteFeedbackServiceStub = sandbox.stub(feedbackService, 'deleteFeedbackService');

      const req = { params: { id: feedbackId } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      await removeFeedback(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal({ message: 'Feedback deleted successfully' });
      expect(deleteFeedbackServiceStub.calledOnceWithExactly(feedbackId)).to.be.true;
    });
  });
});
