import { 
  emailValidation, 
  passwordValidation, 
  nameValidation, 
  matchPasswordValidation, 
  requiredFieldValidation, 
  countryValidation 
} from './validations';

export const signUpValidations = [
  {
    valid: (data) => nameValidation('first name').valid(data.firstName),
    error: nameValidation('first name').error
  },
  {
    valid: (data) => nameValidation('last name').valid(data.lastName),
    error: nameValidation('last name').error
  },
  {
    valid: (data) => emailValidation.valid(data.email),
    error: emailValidation.error
  },
  {
    valid: (data) => passwordValidation.valid(data.password),
    error: passwordValidation.error
  },
  {
    valid: (data) => matchPasswordValidation().valid(data),
    error: matchPasswordValidation().error
  },
  {
    valid: (data) => requiredFieldValidation('address').valid(data.address),
    error: requiredFieldValidation('address').error
  },
  {
    valid: (data) => countryValidation.valid(data.country),
    error: countryValidation.error
  }
];

export const loginValidations = [
  {
    valid: (data) => emailValidation.valid(data.email),
    error: emailValidation.error
  },
  {
    valid: (data) => passwordValidation.valid(data.password),
    error: passwordValidation.error
  }
];

export const passwordResetValidations = [
  {
    valid: (data) => passwordValidation.valid(data.password),
    error: passwordValidation.error
  },
  {
    valid: (data) => matchPasswordValidation().valid(data),
    error: matchPasswordValidation().error
  }
];

export const fieldValidations = {
  email: emailValidation,
  password: passwordValidation,
  firstName: nameValidation('first name'),
  lastName: nameValidation('last name'),
  address: requiredFieldValidation('address'),
  country: countryValidation
};