const bcrypt = require("bcrypt");
const UserModel = require("../../models/user-models");
const UserDto = require("../../dtos/user-dto");
const ApiError = require("../../exceptions/api-error");
const {
  generateTokens,
  saveToken,
  removeToken,
  validateRefreshToken,
  findToken,
} = require("./token-service");

const registrationService = async (login, password) => {
  const candidate = await UserModel.findOne({ login });
  if (candidate) {
    throw ApiError.BadRequest(`Пользователь с логином ${login} уже существует`);
  }

  const hashPassword = await bcrypt.hash(password, 3);
  const user = await UserModel.create({ login, password: hashPassword });
  const userDto = new UserDto(user);
  const tokens = await generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

const authorizationService = async (login, password) => {
  const user = await UserModel.findOne({ login });
  if (!user) {
    throw ApiError.BadRequest(`Пользователь с таким логином не найден`);
  }

  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequest(`Неверный пароль`);
  }

  const userDto = new UserDto(user);
  const tokens = await generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

const logoutService = async (refreshToken) => {
  const token = await removeToken(refreshToken);
  return token;
};

const refreshService = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnathorizedError();
  }

  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    throw ApiError.UnathorizedError();
  }

  const user = await UserModel.findById(userData.id);
  const userDto = new UserDto(user);
  const tokens = await generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

module.exports = {
  registrationService,
  authorizationService,
  logoutService,
  refreshService,
};
