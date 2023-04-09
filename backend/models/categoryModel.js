import mongoose from 'mongoose';

const {Schema, model} = mongoose

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('Category', categorySchema);
