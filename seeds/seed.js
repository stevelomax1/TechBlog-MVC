const sequelize = require('../models/index');
const { User, Post, Comment } = require('../models');

const userData = [
  {
    username: 'user1',
    password: 'password1'
  },
  {
    username: 'user2',
    password: 'password2'
  }
];

const postData = [
  {
    title: 'Post 1',
    content: 'Content of post 1',
    user_id: 1
  },
  {
    title: 'Post 2',
    content: 'Content of post 2',
    user_id: 2
  }
];

const commentData = [
  {
    comment_text: 'Comment 1',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'Comment 2',
    user_id: 2,
    post_id: 2
  }
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, { individualHooks: true });
  await Post.bulkCreate(postData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
