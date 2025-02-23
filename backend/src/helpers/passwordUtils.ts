import bcrypt from "bcrypt";

export const comparePassword = async (
  input: string,
  correctPassword: string
) => {
  const hashedInput = await bcrypt.hash(input, 10);
  const isMatch = await bcrypt.compare(hashedInput, correctPassword);

  return isMatch;
};
