export const CreateOfferValidationMessage = {
  title: {
    invalid: 'Title must be a string.',
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    invalid: 'Description must be a string.',
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  publicationDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city: {
    invalid: 'City must be a valid city',
  },
  previewImage: {
    invalid: 'Description must be a string.',
    maxLength: 'Maximum image length must be 256',
  },
  propertyPhotos: {
    invalid: 'Property photos must be an array of strings.',
    minLength: 'Minimum property photos length must be 1',
  },
  premium: {
    invalid: 'Premium must be a boolean.',
  },
  rating: {
    invalid: 'Rating must be a number.',
    min: 'Minimum rating must be 1',
    max: 'Maximum rating must be 5',
  },
  objectType: {
    invalid: 'Object type must be a valid object type',
  },
  numberOfRooms: {
    invalid: 'Number of rooms must be a number.',
    min: 'Minimum number of rooms must be 1',
    max: 'Maximum number of rooms must be 8',
  },
  numberOfGuests: {
    invalid: 'Number of guests must be a number.',
    min: 'Minimum number of guests must be 1',
    max: 'Maximum number of guests must be 8',
  },
  rentalCost: {
    invalid: 'Rental cost must be a number.',
    min: 'Minimum rental cost must be 100',
    max: 'Maximum rental cost must be 100000',
  },
  amenities: {
    invalid: 'Amenities must be an array of amenities.',
    minLength: 'Minimum amenities length must be 1',
  },
  author: {
    invalid: 'Author must be a valid user.',
  },
  location: {
    invalid: 'Location must be a valid location.',
  },
};
