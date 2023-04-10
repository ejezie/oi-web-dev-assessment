import mongoose from 'mongoose';

const {Schema, model} = mongoose

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('Tag', tagSchema);
