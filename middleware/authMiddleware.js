import { BADREQUEST } from "../errors/customErrors.js";
import { verifyToken } from "../utils/createJwt.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new BADREQUEST("invalid token");
  }
  try {
    const verifyiedToken = await verifyToken({ token });
    req.user = verifyiedToken;
    next();
  } catch (error) {
    throw new BADREQUEST(error);
  }
};
