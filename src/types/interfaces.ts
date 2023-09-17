export type CITY = 'Berlin' | 'New Delhi' | 'Other';

export type User = {
  name: String;

  email: String;
  password: String;

  location: {
    lat: number;
    lng: number;
  };
  city: string;
  nomId: string;
  experience: string;
  foundDetail: string;
  alias: string;
  correctPassword: any;
};

export type UserValidate = {
  name?: String;
  email?: String;
  password?: String;
  contactNumber?: String;
  passwordConfirm?: String;
};
