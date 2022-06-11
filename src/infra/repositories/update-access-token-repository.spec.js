const MongoHelper = require("../helpers/mongo-helper");
const MissingParamError = require("../../utils/errors/missing-param-error");
const UpdateAccessTokenRepository = require("./update-access-token-repository");
let userModel, fakeUserId;

const makeSut = () => {
  return new UpdateAccessTokenRepository();
};

describe("UpdateAccessToken Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    userModel = await MongoHelper.getCollection("users");
  });

  beforeEach(async () => {
    const userModel = db.collection("users");
    await userModel.deleteMany();
    const fakeUser = await userModel.insertOne({
      email: "valid_email@mail.com",
      name: "any_name",
      age: 40,
      state: "any_state",
      password: "hashed_password",
    });
    fakeUserId = fakeUserId;
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test("Should update the user with the given access token", async () => {
    const sut = makeSut();
    await sut.update(fakeUserId, "valid_token");
    const updatedFakeUser = userModel.findOne({
      _id: fakeUserId,
    });
    expect(updatedFakeUser.accessToken).toBe("valid_token");
  });

  test("Should throw if no params are provided", async () => {
    const sut = makeSut();
    expect(sut.update()).rejects.toThrow(new MissingParamError("UserId"));
    expect(sut.update().fakeUserId).rejects.toThrow(
      new MissingParamError("AccessToken")
    );
  });
});
