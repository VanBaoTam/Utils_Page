import { ETypeValidation } from "./types";

export const DATE_FORMAT = "DD-MM-YYYY";
export const TIMEZONE = "Asia/Ho_Chi_Minh";
const USERNAME_FORMAT = /^[a-zA-Z0-9_]{4,30}$/;
const PASSWORD_FORMAT = /^.{6,50}$/;
const NAME_FORMAT = /^[\p{L}0-9_ ]{4,30}$/u;
const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]{2,30}$/;
export function CredentialsValidation(type: string, value: string) {
  switch (type) {
    case ETypeValidation.name: {
      return NAME_FORMAT.test(value);
    }
    case ETypeValidation.email: {
      return EMAIL_FORMAT.test(value);
    }
    case ETypeValidation.password: {
      return PASSWORD_FORMAT.test(value);
    }
    case ETypeValidation.username: {
      return USERNAME_FORMAT.test(value);
    }
  }
}
