const { ObjectId } = require("mongodb");
const client = require("./db");

const dbName = process.env.DATABASE;
const db = client.db(dbName);
const users = db.collection("users");

async function createUser(email, name, password) {
  const user = { name, email, password, tokens: [] };
  const newUser = await users.insertOne(user);
  return newUser.insertedId;
}

async function getUserByEmail(email) {
  const user = await users.findOne({ email });
  return user;
}

async function getUserById(_id) {
  const user = await users.findOne({ _id: new ObjectId(_id) });
  return user;
}

function saveLoginToken(userId, token) {
  return users.updateOne(
    { _id: userId },
    {
      $push: { tokens: token },
    }
  );
}

async function deleteUserToken(user, token) {
  const filteredTokens = user.tokens.filter((t) => t !== token);
  updatedTokens = {
    $set: {
      tokens: filteredTokens,
    },
  };
  return users.updateOne({ _id: user._id }, updatedTokens);
}

module.exports = {
  createUser,
  getUserByEmail,
  saveLoginToken,
  getUserById,
  deleteUserToken,
};

// id, email, name, password (hashed), tokens, createdAt, updatedAt
