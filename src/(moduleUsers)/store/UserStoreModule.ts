import { ILoginUser, IRegistrationUser, IUser } from "../../../src3/Services/interfaces/User/IUser";

export const InitialStateUser: IUser = {
    name: "",
    email: "",
    password: ""
};
export const InitialStateCreateUser: IRegistrationUser = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
};
export const InitialStateLoginUser: ILoginUser = {
    name: "",
    email: "",
    password: "",
};








export const InitialStateCreateUserValidation = {
    name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined
};
