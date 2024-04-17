import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const FeedBackSchema = new Schema({
  noOfStars: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

FeedBackSchema.plugin(aggregatePaginate);
FeedBackSchema.index({ createdAt: 1 });

const FeedBack = model('feedBack', FeedBackSchema);
FeedBack.syncIndexes();

export default FeedBack;
