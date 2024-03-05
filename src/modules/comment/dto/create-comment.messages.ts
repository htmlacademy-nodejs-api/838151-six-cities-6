export const CreateCommentValidationMessage = {
  text: {
    invalid: 'Text must be a string.',
    minLength: 'Minimum text length must be 5',
    maxLength: 'Maximum text length must be 1024',
  },
  offerId: {
    invalid: 'Offer ID must be a valid object ID',
  },
  rating: {
    invalid: 'Rating must be a number.',
    min: 'Rating must be at least 1.',
    max: 'Rating must be at most 5.',
  },
};
