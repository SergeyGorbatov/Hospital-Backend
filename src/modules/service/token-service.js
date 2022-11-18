const jwt = require("jsonwebtoken");
const tokenModel = require("../../models/token-model");
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require("../../../config");

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: "60m",
  });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  return {
    accessToken,
    refreshToken,
  };
};

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, JWT_REFRESH_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

const saveToken = async (userId, refreshToken) => {
  const tokenData = await tokenModel.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  const token = await tokenModel.create({ user: userId, refreshToken });
  return token;
};

const removeToken = async (refreshToken) => {
  const tokenData = await tokenModel.deleteOne({ refreshToken });
  return tokenData;
};

const findToken = async (refreshToken) => {
  const tokenData = await tokenModel.findOne({ refreshToken });
  return tokenData;
};

module.exports = {
  generateTokens,
  saveToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken,
};
