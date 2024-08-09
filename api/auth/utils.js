const { findUserByUsername } = require("../../db/users");

// check user has given username and password in body
const checkUserData = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Please provide username and password" });
  }

  next();
};

const checkUserExists = async (req, res, next) => {
  const isUser = await findUserByUsername(req.body.username);

  if (isUser) {
    // error if username exists
    return res.status(409).send({
      name: "UserExistsError",
      message: "A user by that username already exists",
    });
  }

  next();
};

module.exports = { checkUserData, checkUserExists };
