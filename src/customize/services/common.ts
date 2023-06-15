import jwt from "jsonwebtoken";

export const genToken = (payload: any) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey);
    return token;
  } catch (error) {
    throw Error(`Gen JWT fail: ${error.message}`);
  }
};

export const verifyToken = (token: string) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    const payload = decoded;
    return payload;
  } catch (error) {
    throw Error(`Error decoding JWT: ${error.message}`);
  }
};
