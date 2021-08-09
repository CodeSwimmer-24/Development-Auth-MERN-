const User = require("../Model/user");
const jwt = require("jsonwebtoken");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// exports.signup = (req, res) => {
//   // console.log("Req body on signup", req.body);
//   const { name, email, password } = req.body;

//   User.findOne({ email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({
//         error: "Email is taken",
//       });
//     }
//   });

//   let newUser = new User({ name, email, password });

//   newUser.save((err, success) => {
//     if (err) {
//       console.log("SIGNUP ERROR", err);
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     res.json({
//       message: "Signup sucess! Please login",
//     });
//   });
// };

// <------------------Signup----------------------->

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `
            <h1>Plese use the following link to activate your account</h1>
            <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
            <hr />
            <p>This email may contains sensetive informations</p>
            <p>${process.env.CLIENT_URL}</p>        `,
    };
    sgMail
      .send(emailData)
      .then((sent) => {
        return res.json({
          message: `Email has been sent  to ${email}.Follow thw instruction to activate your account`,
        });
      })
      .catch((err) => {
        console.log("Signup email sent error", err);
        return res.json({
          message: err.message,
        });
      });
  });
};

// <------------------------Email-verification-------------------------->

exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("Jwt verify in account activation error", err);
          return res.status(401).json({
            error: "Expaired link.SignUp again",
          });
        }
        const { name, email, password } = jwt.decode(token);
        const user = new User({ name, email, password });
        user.save((err, user) => {
          if (err) {
            console.log("Save user in account activation error", err);
            return res.status(401).json({
              error: "Error saving user in database",
            });
          }
          return res.json({
            message: "Signup sucess. please signin.",
          });
        });
      }
    );
  } else {
    return res.json({
      message: "Someting went wrong try again",
    });
  }
};

// <------------------Signin---------------->

exports.signin = (req, res) => {
  // check if the user exist
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please SignIn",
      });
    }
    // authenticate user
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    // generaate the token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });
    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};
