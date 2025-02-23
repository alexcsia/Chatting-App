import bcrypt from "bcrypt";

export const comparePassword = async (
  input: string,
  correctPassword: string
) => {
  const hashedInput = await bcrypt.hash(input, 10);
  const isMatch = await bcrypt.compare(hashedInput, correctPassword);

  return isMatch;
};

export const hashPassword = async (input: string) => {
  const hashedPassword = await bcrypt.hash(input, 10);
  return hashedPassword;
};
