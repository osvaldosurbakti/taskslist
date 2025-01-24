exports.ensureAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    console.log('User not authenticated, redirecting to login'); // Logging tambahan
    return res.redirect('/');
  }
  next();
};
