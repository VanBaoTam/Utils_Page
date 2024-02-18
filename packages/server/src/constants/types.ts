export interface ILogin {
  username: string;
  password: string;
}
export interface IRegister {
  username: string;
  password: string;
  name: string;
  email: string;
}
export enum ETypeValidation {
  username = "username",
  password = "password",
  name = "name",
  email = "email",
}
