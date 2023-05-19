const mongoose = require('mongoose');

/*
Add a new field called tags to the PostSchema. The tags field is an array of strings. The tags field is not required.
Sample Object: 
{
  author: "author_id_1",
  content: "This is a sample post",
  likes: [
    "user_id_1",
    "user_id_2"
  ],
  comments: [
    {
      author: "comment_author_id_1",
      content: "Great post!",
      createdAt: "2023-05-16T10:30:00.000Z"
    },
    {
      author: "comment_author_id_2",
      content: "I agree!",
      createdAt: "2023-05-16T11:15:00.000Z"
    }
  ],
  tags: ["tag1", "tag2", "tag3"],
  createdAt: "2023-05-16T09:00:00.000Z"
}
*/

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  tags: [
    {
      type: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;