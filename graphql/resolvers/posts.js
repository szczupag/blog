const { AuthenticationError, UserInputError } = require('apollo-server');

const { validatePostInput } = require('../../utils/validators');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { title, body }, context) {
      const user = checkAuth(context);
      const { valid, errors } = validatePostInput(title, body);

      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const newPost = new Post({
        title,
        body,
        user: user.id,
        author: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.author) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updatePost(_, { postId, body }, context) {
      const user = checkAuth(context);
      try {
        await Post.findOneAndUpdate({ "_id": postId }, { "$set": { body } });
        return 'Succesfully updated';
      } catch (err) {
        throw new Error(err);
      }
    },
  }
}