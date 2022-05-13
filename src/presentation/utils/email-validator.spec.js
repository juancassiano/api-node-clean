const validator = require("validator");
class EmailValidator {
  isValid(email) {
    return validator.isEmail(email);
  }
}

describe("Email Validator", () => {
  test("Should return true if validator returns true", () => {
    validator.isEmailValid = false;
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid("valid_email@mail.com");
    expect(isEmailValid).toBe(false);
  });

  test("Should return false if validator returns false", () => {
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid("invalid_email@mail.com");
    expect(isEmailValid).toBe(false);
  });
});
