import type { IUser } from '../../interfaces/user.interface';

export class UserEntity implements IUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    isActive: boolean;
    isAdult: boolean;

    constructor(data: Partial<IUser> = {}) {
        this.id = data.id ?? '';
        this.name = data.name ?? '';
        this.email = data.email ?? '';
        this.password = data.password ?? '';
        this.isActive = data.isActive ?? true;
        this.isAdult = data.isAdult ?? true;
    }

    static fromInterface(i: IUser) {
        return new UserEntity(i);
    }

    toInterface(): IUser {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            isActive: this.isActive,
            isAdult: this.isAdult,
        } as IUser;
    }

    toPublic(): Omit<IUser, 'password'> {
        const { password, ...rest } = this.toInterface();
        return rest;
    }
}