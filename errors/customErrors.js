import { StatusCodes } from "http-status-codes";

export class BADREQUEST extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class NOTFOUND extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export class UNAUTHORIZED extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
