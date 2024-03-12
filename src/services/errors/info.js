export const generateUserErrorInfo = (user) => {
  return `There was a problem creating a user:
    first_name: needs to be a string, received ${typeof user.first_name}
    last_name: needs to be a string, received ${typeof user.last_name}
    email_name: needs to be a string, received ${typeof user.email}
    `;
};
