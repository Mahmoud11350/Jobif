import { UNAUTHORIZED } from "../errors/customErrors.js";

export const checkPermission = ({ req, id }) => {
  if (req.user.role === "admin") return;
  if (req.user.userId.toString() === id?.toString()) return;
  throw new UNAUTHORIZED("not allowed to access this route");
};
