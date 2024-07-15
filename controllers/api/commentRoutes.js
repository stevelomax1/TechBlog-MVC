const router = require('express').Router();
const { Comment } = require('../../models/');
const { loginGuard } = require('../../utils/authGuard');

router.post('/', loginGuard, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.user_id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
