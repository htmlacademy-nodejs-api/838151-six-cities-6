export const CreateUserValidationMessage = {
  email: {
    invalid: 'Email must be a valid email address.',
  },
  name: {
    invalid: 'Name must be a string.',
    minLength: 'Name must be longer than or equal to 1 characters.',
    maxLength: 'Name must be shorter than or equal to 15 characters.',
  },
  password: {
    invalid: 'Password must be a string.',
    minLength: 'Password must be longer than or equal to 6 characters.',
    maxLength: 'Password must be shorter than or equal to 12 characters.',
  },
};
