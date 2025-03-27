import validator from 'email-validator';

const emailValidator = (email: string) => {
  return validator.validate(email);
};

export { emailValidator };
