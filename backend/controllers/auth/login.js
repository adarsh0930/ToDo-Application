const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const { getUserByEmail, saveLoginToken } = require("../../models/user");

function validate({ email, password }) {
  if (!validator.isEmail(email)) {
    return { isValid: false, message: "Invalid Credentials" };
  }

  if (password.length < 8) {
    return { isValid: false, message: "Invalid Credentials" };
  }

  return { isValid: true };
}

async function login(req, res) {
  try {
    const validationResult = validate(req.body);
    if (!validationResult.isValid) {
      return res.status(401).send({ error: validationResult.message });
    }

    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).send({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    await saveLoginToken(user._id, token);

    const responseData = {
      user: {
        id: user._id,
        name: user.name,
        email,
        token,
      },
    };

    res.send({ data: responseData });
  } catch (error) {
    console.error("Error during Login: ", error);
    res.status(500).send();
  }
}

module.exports = login;
