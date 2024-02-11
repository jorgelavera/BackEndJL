import bcrypt from "bcrypt";

export const isValidPassword = (user, password) => {
  const compared = bcrypt.compareSync(password, user.password);
  console.log("bc1=>" + compared);
  return compared;
};

export const createHash = (password) => {
  console.log("bc3=>" + password);
  return (bcrypt.hashSync(password, bcrypt.genSaltSync(10)));
};
