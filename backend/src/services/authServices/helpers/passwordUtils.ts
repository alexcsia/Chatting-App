import bcrypt from "bcrypt";

export const comparePassword = async (data: {
  input: string;
  correctPassword: string;
}) => {
  const isMatch = await bcrypt.compare(data.input, data.correctPassword);
  return isMatch;
};

export const hashPassword = async (input: string) => {
  const hashedPassword = await bcrypt.hash(input, 10);
  return hashedPassword;
};
