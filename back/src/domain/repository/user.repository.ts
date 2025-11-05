import type { IUser } from "../../interfaces/user.interface";
import type { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
    abstract createUser(userData: IUser): Promise<UserEntity>;
    abstract getUsers(): Promise<UserEntity[]>;
    abstract getUserByEmail(email: string): Promise<{ id: string; name: string; email: string; password?: string; phone?: string; isActive: boolean; isAdult: boolean } | null>;
    abstract updateUser(userId: string, updateData: { name?: string; email?: string; password?: string; phone?: string; isActive?: boolean; isAdult?: boolean }): Promise<void>;
    abstract deactivateUser(userId: string): Promise<void>;
}