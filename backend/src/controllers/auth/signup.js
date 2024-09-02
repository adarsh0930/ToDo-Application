const bcrypt = require("bcrypt");
const validator = require("validator");
const { getUserByEmail, createUser } = require("../../models/user");

function validate({ name, email, password }) {
  if (!validator.isEmail(email)) {
    return { isValid: false, message: "Please enter a valid email" };
  }

  if (validator.isEmpty(name)) {
    return { isValid: false, message: "Name can not be empty" };
  }

  if (password.length < 8) {
    return { isValid: false, message: "Password must be atleast 8 characters" };
  }

  return { isValid: true };
}

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const validationResult = validate(req.body);
    if (!validationResult.isValid) {
      return res.status(400).send({ error: validationResult.message });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).send({
        error: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const userId = await createUser(email, name, hashedPassword);
    const user = { id: userId, name, email };

    res.status(200);
    res.send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = signUp;
