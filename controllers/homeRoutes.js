const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const { withProtect, withoutProtect } = require('../utils/authGuard');

router.get('/', async (req, res) => {
  try {
    const postInfo = await Post.findAll({
      include: [User],
    });

    const posts = postInfo.map((post) => post.get({ plain: true }));

    res.render('home', { posts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postInfo = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postInfo) {
      const post = postInfo.get({ plain: true });

      res.render('post', { post, loggedIn: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
}); /*GET route for post/comments*/

router.get('/login', withoutProtect, (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
}); /*GET route for login*/

router.get('/signup', withoutProtect, (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
}); /*GET route for signup*/

module.exports = router;