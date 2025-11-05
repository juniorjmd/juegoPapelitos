import UserModel from "../../database/models/user.js";
import type { UserDatasource } from "../../domain/datasources/user.datasource.js";
import { UserEntity } from "../../domain/entities/user.entity.js";
import type { IUser } from "../../interfaces/user.interface.js";

export class MongoUserDatasource implements UserDatasource {
    async createUser(userData: IUser): Promise<UserEntity> {
        try {
            const data = await UserModel.create(userData);
            return UserEntity.fromInterface(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUsers(): Promise<UserEntity[]> {
        const users = await UserModel.find({});

        return users.map(UserEntity.fromInterface);
    }

    async getUsersByType(type:string): Promise<UserEntity[]> {

        if (!type || (type !== 'adult' && type !== 'kids')) {
            const users = await UserModel.find({}); 
            return users.map(UserEntity.fromInterface);
        }else{
           const isAdult = type === 'adult';
           const users = await UserModel.find({ isAdult }); 
           return users.map(UserEntity.fromInterface);
        }
       
    }
    async getUserByEmail(email: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({ email }).select('-password');

        return user ? UserEntity.fromInterface(user) : null;
    }

    async updateUser(userId: string, updateData: Partial<IUser>): Promise<void> {
        const userData = await UserModel.findByIdAndUpdate(userId, updateData);
        if (!userData) {
            throw new Error("User not found");
        }
    }

    async deactivateUser(userId: string): Promise<void> {
        const userData = await UserModel.findByIdAndDelete(userId);
        if (!userData) {
            throw new Error("User not found");
        }
    }
}