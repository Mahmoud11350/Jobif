import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  let customError = {
    msg: err.message || "something went wrong try again later",
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  if (err && err.name === "ValidationError") {
    customError.msg = Object.keys(err.errors)
      .map((errName) => err.errors[errName].message)
      .join(" & ");
    customError.status = StatusCodes.BAD_REQUEST;
  }
  if (err && err.name == "CastError") {
    (customError.msg = "user id not valid"),
      (customError.status = StatusCodes.BAD_REQUEST);
  }
  return res.status(customError.status).json({
    msg: customError.msg,
  });
  return res.send(err);
};

export default errorHandler;
