import type { UserDatasource } from "../../domain/datasources/user.datasource";
import type { UserEntity } from "../../domain/entities/user.entity";
import type { UserRepository } from "../../domain/repository/user.repository";
import type { IUser } from "../../interfaces/user.interface";

export class UserImplRepository implements UserRepository {
    constructor(private readonly userDatasource: UserDatasource) {}

    createUser(userData: IUser): Promise<UserEntity> {
        return this.userDatasource.createUser(userData);
    }
    getUsers(): Promise<UserEntity[]> {
        return this.userDatasource.getUsers();
    }
    getUsersByType(type: string): Promise<UserEntity[]> {
        return this.userDatasource.getUsersByType(type);
    }
    getUserByEmail(email: string): Promise<IUser | null> {
        return this.userDatasource.getUserByEmail(email);
    }
    updateUser(userId: string, updateData: Partial<IUser>): Promise<void> {
        return this.userDatasource.updateUser(userId, updateData);
    }
    deactivateUser(userId: string): Promise<void> {
        return this.userDatasource.deactivateUser(userId);
    }
}
