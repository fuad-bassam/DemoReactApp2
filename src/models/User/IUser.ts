export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface IRegistrationUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ILoginUser {
  name?: string;
  email?: string;
  password: string;
}