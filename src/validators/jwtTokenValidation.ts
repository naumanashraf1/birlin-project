import jwt from 'jsonwebtoken';
export const verifyToken = (token: string) =>
  new Promise((res, rej) => {
    try {
      res(jwt.verify(token, String(process.env.SCRET_JWT)));
    } catch (error) {
      rej(error);
    }
  });
