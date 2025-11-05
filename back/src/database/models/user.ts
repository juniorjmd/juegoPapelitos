import mongoose, { model, Model, Schema } from "mongoose";
import type { IUser } from "../../interfaces/user.interface";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
    isAdult: { type: Boolean, required: true },
}, {
    versionKey: false
});

const UserModel: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);

export default UserModel;
