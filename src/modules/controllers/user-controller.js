const {
  registrationService,
  authorizationService,
  logoutService,
  refreshService,
} = require("../service/user-service");

const optionsRefreshCookie = {
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
  httpOnly: true,
};

const optionsAccessCookie = {
  maxAge: 24 * 60 * 60 * 1000, // 1 день
  httpOnly: true,
};

const registration = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const userData = await registrationService(login, password);
    res.cookie("refreshToken", userData.refreshToken, optionsRefreshCookie);
    res.cookie("accessToken", userData.accessToken, optionsAccessCookie);
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

const authorization = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const userData = await authorizationService(login, password);
    res.cookie("refreshToken", userData.refreshToken, optionsRefreshCookie);
    res.cookie("accessToken", userData.accessToken, optionsAccessCookie);
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await logoutService(refreshToken);
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res.json(token);
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await refreshService(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, optionsRefreshCookie);
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registration,
  authorization,
  logout,
  refresh,
};
