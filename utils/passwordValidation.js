export const passwordRequirements = [
  {
    id: 'length',
    label: 'Minimum 8 characters',
    validator: (password) => password.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'At least one uppercase letter',
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'lowercase', 
    label: 'At least one lowercase letter',
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: 'digit',
    label: 'At least one digit',
    validator: (password) => /\d/.test(password),
  },
  {
    id: 'special',
    label: 'At least one special character',
    validator: (password) => /[\W_]/.test(password),
  },
];

export const isPasswordValid = (password) => {
  return passwordRequirements.every(req => req.validator(password));
};