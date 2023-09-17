import * as Yup from 'yup';

export const envSchema = Yup.object().shape({
  NODE_ENV: Yup.string()
    // .oneOf(["production", "development", "staging", "test"])
    .required('NODE_ENV variable is required.'),

  MONGO_DB_CONNECT_STRING: Yup.string().required(
    'MONGO_DB_CONNECT_STRING connection string is required.'
  ),

  PORT: Yup.number()
    .min(1)
    .max(65635)
    .default(5000)
    .required('PORT is required for this application to start'),
  STRIPE_PUBLISHABLE_KEY: Yup.string(),
  STRIPE_SECRET_KEY: Yup.string(),
  // DEFAULT_PAGE_SIZE: Yup.string().required(
  //   'DEFAULT_PAGE_SIZE variable for service page is required.'
  // ),

  // DEFAULT_PAGE_NUMBER: Yup.string().required(
  //   'DEFAULT_PAGE_NUMBER variable for is required.'
  // ),

  BASE64_SIGNER_KEY: Yup.string().required(
    'BASE64_SIGNER_KEY variable is required for authentication.'
  ),

  BASE64_SALT_SEPARATOR: Yup.string().required(
    'BASE64_SALT_SEPARATOR variable is required for authentication.'
  ),

  ROUNDS: Yup.number().required(
    'ROUNDS variable is required for authentication.'
  ),

  MEM_COST: Yup.number().required(
    'MEM_COST variable is required for authentication.'
  ),
});
