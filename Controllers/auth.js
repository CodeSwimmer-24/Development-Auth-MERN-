const User = require("../Model/user");

exports.signup = (req, res) => {
  // console.log("Req body on signup", req.body);
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
  });

  let newUser = new User({ name, email, password });

  newUser.save((err, sucess) => {
    if (err) {
      console.log("SIGNUP ERROR", err);
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Signup sucess! Please login",
    });
  });
};
