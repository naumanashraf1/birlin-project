export type User = {
  name: String;

  email: String;
  password: String;

  location: {
    type: string;
    coordinates: string[];
  };
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
