import { Response } from "express";

export class ResponseMessage {
  private static readonly instance: ResponseMessage;

  static getInstance() {
    if (!this.instance) {
      return this.instance;
    }
  }

  getError(response: Response, statusCode: number, errorMessage: string) {
    return response.status(statusCode).json({
      error: errorMessage,
    });
  }

  getSuccess(
    response: Response,
    statusCode: number,
    errorMessage: string,
    data: any,
  ) {
    return response.status(statusCode).json({
      message: errorMessage,
      ...data,
    });
  }
}
export const responseMessageInstance = new ResponseMessage();
