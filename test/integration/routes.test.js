import express from 'express';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'supertest';
import feedbackRouter from '@/routes/v1/feedback.routes';
import { setupTestEnvironment, teardownTestEnvironment } from '../test-setup';

chai.use(chaiAsPromised);
const { expect } = chai;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (_, res) => res.status(200).json({ message: 'Server Up and Running!' }));
app.use('/api/v1/feedback', feedbackRouter);

describe('Feedback Routes', () => {
  let id;

  it('should create a new feedback', async () => {
    const newFeedback = { rating: 5, review: 'Great service!' };
    const response = await request(app).post('/api/v1/feedback').send(newFeedback);
    id = response.body.data._id;
    expect(response.status).to.equal(200);
  });

  it('should get all feedbacks', async () => {
    const response = await request(app).get('/api/v1/feedback');
    expect(response.status).to.equal(200);
  });

  it('should get a feedback by ID', async () => {
    const response = await request(app).get(`/api/v1/feedback/${id}`);
    expect(response.status).to.equal(200);
  });

  it('should update a feedback', async () => {
    const updatedFeedback = { rating: 4, review: 'Updated experience' };
    const response = await request(app).patch(`/api/v1/feedback/${id}`).send(updatedFeedback);
    expect(response.status).to.equal(200);
  });

  it('should delete a feedback', async () => {
    const response = await request(app).delete(`/api/v1/feedback/${id}`);
    expect(response.status).to.equal(200);
  });

  it('should return an error for an invalid feedback ID', async () => {
    const response = await request(app).get('/api/v1/feedback/invalidId');
    expect(response.status).to.equal(500);
  });

  it('should return an error for missing required fields when creating a new feedback', async () => {
    const newFeedback = {};
    const response = await request(app).post('/api/v1/feedback').send(newFeedback);
    expect(response.status).to.equal(500);
  });

  it('should return an error for an invalid rating value when creating or updating a feedback', async () => {
    const invalidFeedback = { rating: 6, review: 'Invalid rating value' };
    const response = await request(app).post('/api/v1/feedback').send(invalidFeedback);
    expect(response.status).to.equal(500);
  });

  it('should return an error when trying to delete a non-existent feedback', async () => {
    const nonExistentId = 'nonExistentId';
    const response = await request(app).delete(`/api/v1/feedback/${nonExistentId}`);
    expect(response.status).to.equal(500);
  });
});
