import { Schema, model } from 'mongoose';

export interface IUser {
    _id?: string;
    email: string;
    password: string;
    permissions?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        permissions: { type: [String], required: true, default: ['user'] },
    },
    { timestamps: true }
);

export default model<IUser>('User', UserSchema);
