import validator from "validator";

export const validatePassword = async (password: string) => {
  validator.isStrongPassword(password, {
    minLength: 10,
    minLowercase: 2,
    minUppercase: 2,
    minNumbers: 2,
    minSymbols: 2,
  });
};
