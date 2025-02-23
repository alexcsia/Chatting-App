import validators from "../../helpers/validators";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  validators.validateUsername(username);
  validators.validateEmail(email);
  validators.validatePassword(password);
};
