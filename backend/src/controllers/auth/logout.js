const { deleteUserToken } = require("../../models/user");

async function logout(req, res) {
  try {
    const { user, token } = req;
    await deleteUserToken(user, token);
    return res.status(200).send("User Logged Out Successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = logout;
