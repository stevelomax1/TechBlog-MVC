const router = require('express').Router();
const { Post } = require('../models');
const { withProtect } = require('../utils/authGuard');

router.get('/', withProtect, async (req, res) => {
  try {
    const postInfo = await Post.findAll({
      where: {
        userId: req.session.user_id,
      },
    });

    const posts = postInfo.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      dashboard: true,
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withProtect, (req, res) => {
  res.render('newPost', {
    dashboard: true,
    loggedIn: req.session.logged_in,
  });
});

router.get('/edit/:id', withProtect, async (req, res) => {
  try {
    const postInfo = await Post.findByPk(req.params.id);

    if (postInfo) {
      const post = postInfo.get({ plain: true });

      res.render('editPost', {
        dashboard: true,
        post,
        loggedIn: req.session.logged_in,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;