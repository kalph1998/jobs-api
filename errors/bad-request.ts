import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-error";

export class BadRequestError extends CustomAPIError {
  statusCode;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
