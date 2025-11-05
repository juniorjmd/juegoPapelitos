export interface IUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    isActive: boolean;
    isAdult: boolean;
}
