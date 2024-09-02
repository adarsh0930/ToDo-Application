const client = require("./db");
const { ObjectId } = require("mongodb");

const dbName = process.env.DATABASE;
const db = client.db(dbName);
const users = db.collection("users");

async function createUser(email, name, password) {
  const user = { name, email, password, tokens: [] };
  const result = await users.insertOne(user);
  return result.insertedId;
}

async function getUserByEmail(email) {
  const result = await users.findOne({ email });
  return result;
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

async function updateUserToken(user, token) {
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
  updateUserToken,
};

// id, email, name, password (hashed), tokens, createdAt, updatedAt
