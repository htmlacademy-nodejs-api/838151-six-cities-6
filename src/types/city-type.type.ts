export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export type CityName = (typeof CITIES)[number];

export type Location = {
  latitude: number;
  longitude: number;
};

export type CityType = {
  name: CityName;
  location: Location;
};
