const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

function issueToken(res, user) {
  const id = user._id;
  const token = jwt.sign({ sub: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}

exports.register = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    const token = issueToken(res, user);

    return res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.verifyPassword(password, user.password))) {
      throw new Error("Incorrect email or password!");
    }

    user.password = undefined;

    const token = issueJWT(res, user);
    return res.status(200).json({
      status: success,
      token,
    });
  } catch (error) {
    res.json(error.message);
  }
};
