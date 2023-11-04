import { BADREQUEST } from "../errors/customErrors.js";

const demoUserMiddleware = async (req, res, next) => {
  const user = req.user;
  if (user.userId == "654509d7d367146c584a6a8a") {
    throw new BADREQUEST("demo user not allowed to edit");
  }
  next();
};

export default demoUserMiddleware;
