import { BADREQUEST } from "../errors/customErrors.js";

const demoUserMiddleware = async (req, res, next) => {
  const user = req.user;
  console.log(user);
  if (user.userId == "6538ebc5386a2c61e36bcfa3") {
    throw new BADREQUEST("demo user not allowed to edit");
  }
  next();
};

export default demoUserMiddleware;
