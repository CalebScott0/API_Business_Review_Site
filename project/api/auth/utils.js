const { getUserByUsername, getUserByEmail } = require("../../db/users");

// check user has given username and password in body
const checkUserData = (req, res, next) => {
  const { username, password } = req.body;

  if (!username?.length || !password?.length) {
    return res
      .status(400)
      .send({ message: "Please provide username and password" });
  }

  next();
};

const checkUserExists = async (req, res, next) => {
  const userNameExists = await getUserByUsername(req.body.username);
  // if user registers with email, check if email is already taken
  const emailExists = req.body.email && (await getUserByEmail(req.body.email));

  if (userNameExists) {
    // error if username exists
    return res.status(409).send({
      name: "UserExistsError",
      message: "An account with that username already exists",
    });
  }

  if (emailExists) {
    // error if email exists
    return res.status(409).send({
      name: "EmailExistsError",
      message: "An account with that email already exists",
    });
  }

  next();
};

module.exports = { checkUserData, checkUserExists };
