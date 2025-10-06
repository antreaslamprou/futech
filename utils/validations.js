export const emailValidation = {
  valid: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  error: "Please enter a valid email"
};

export const passwordValidation = {
  valid: (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password),
  error: "Please enter a valid password"
};

export const nameValidation = (fieldName) => ({
  valid: (name) => name.trim().length >= 3,
  error: `Please enter a valid ${fieldName}`
});

export const matchPasswordValidation = (passwordField = 'password') => ({
  valid: (data) => data[passwordField] === data.confirmPassword,
  error: "Passwords do not match"
});

export const requiredFieldValidation = (fieldName) => ({
  valid: (value) => value.trim().length >= 3,
  error: `Please enter a valid ${fieldName}`
});

export const countryValidation = {
  valid: (country) => country !== "",
  error: "Please select your country"
};