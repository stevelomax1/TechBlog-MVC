let withProtect = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

let loginGuard = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(403).json({ msg: 'you must login first' });
  } else {
    next();
  }
};

let withoutProtect = (req, res, next) => {
  if (!req.session.logged_in) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { withProtect, loginGuard, withoutProtect };
  