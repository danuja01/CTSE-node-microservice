import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const FeedbackSchema = new Schema({
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});

FeedbackSchema.plugin(aggregatePaginate);
FeedbackSchema.index({ createdAt: 1 });

const Feedback = model('Feedback', FeedbackSchema);

export default Feedback;
