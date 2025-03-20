import { ILoginUser, IRegistrationUser, IUser } from "../../models/User/IUser";

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
