import mongoose from 'mongoose';

const {Schema, model} = mongoose

const tagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model("Tag", tagSchema)
