import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const FeedbackSchema = new Schema({
  noOfStars: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

FeedbackSchema.plugin(aggregatePaginate);
FeedbackSchema.index({ createdAt: 1 });

const Feedback = model('feedBack', FeedbackSchema);
Feedback.syncIndexes();

export default Feedback;
