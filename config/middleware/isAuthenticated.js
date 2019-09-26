//middleware for restricting routes
module.exports = function(req, res, next) {
  //If the user is logged in, coninue with route
  if (req.user) {
    return next();
  }
  //If not the user redirect to homepage
  return res.redirect("/");
};
