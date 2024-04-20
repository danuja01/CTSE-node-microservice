import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { default as Feedback } from '../../src/models/feedback';
import { setupTestEnvironment, teardownTestEnvironment } from '../test-setup';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Feedback Model', function () {
  beforeEach(async function () {
    await Feedback.deleteMany({});
  });

  describe('Validation', function () {
    it('should be invalid if rating is empty', async function () {
      const feedback = new Feedback({ review: 'Great service!' });
      let error;
      try {
        await feedback.validate();
      } catch (err) {
        error = err;
      }
      expect(error.errors.rating).to.exist;
    });

    it('should be invalid if review is empty', async function () {
      const feedback = new Feedback({ rating: 5 });
      let error;
      try {
        await feedback.validate();
      } catch (err) {
        error = err;
      }
      expect(error.errors.review).to.exist;
    });

    it('should save successfully with required fields', async function () {
      const feedback = new Feedback({ rating: 5, review: 'Outstanding experience.' });
      await expect(feedback.save()).to.be.fulfilled;
    });
  });
});
