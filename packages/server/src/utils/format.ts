import dayjs from "dayjs";
import { EMAIL_FORMAT } from "../constants/index.js";
export class Date {
  public isValidDate(dateStr: string): boolean {
    const parsedDate = dayjs(dateStr);
    return parsedDate.isValid();
  }
}

export class Email {
  public isValidEmail(email: string): boolean {
    const emailFormat = EMAIL_FORMAT;
    return emailFormat.test(email);
  }
}
export const emailInstance = new Email();
