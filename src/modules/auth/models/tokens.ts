import { Schema, model } from 'mongoose';

export interface ITokens {
    _id?: string;
    userId: string;
    accessToken: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}

const TokensSchema = new Schema<ITokens>(
    {
        userId: { type: String, required: true },
        accessToken: { type: String, required: true },
        refreshToken: { type: String, required: true },
    },
    { timestamps: true }
);

export default model<ITokens>('Tokens', TokensSchema);
