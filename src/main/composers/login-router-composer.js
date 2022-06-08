const LoginRouter = require("../../presentation/router/login-router");
const AuthUseCase = require("../../domain/useCases/auth-usecase");
const EmailValidator = require("../../utils/helpers/email-validator");
const LoadUserByEmailRepository = require("../../infra/repositories/load-user-by-email-repository");
const UpdateAccessTokenRepository = require("../../infra/repositories/update-access-token-repository");
const Encrypter = require("../../utils/helpers/encrypter");
const TokenGenerator = require("../../utils/helpers/token-generator");
const env = require("../config/env");

const loadUserByEmailRepository = new LoadUserByEmailRepository();
const updateAccessTokenRepository = new UpdateAccessTokenRepository();
const tokenGenerator = new TokenGenerator(env.tokenSecret);
const emailValidator = new EmailValidator();
const encrypter = new Encrypter();
const authUseCase = new AuthUseCase({
  loadUserByEmailRepository,
  updateAccessTokenRepository,
  encrypter,
  tokenGenerator,
});
const loginRouter = new LoginRouter({ authUseCase, emailValidator });
router.post("/login", loginRouter);

module.exports = loginRouter;