import Tokens, { ITokens } from '../../models/tokens';

interface createTokensPair {
    userId: string;
    accessToken: string;
    refreshToken: string;
}
export class MongoTokensDAO {
    async getUserTokens(userId: string): Promise<ITokens[]> {
        return Tokens.find({ userId });
    }
    async createTokensPair(params: createTokensPair) {
        await Tokens.create(params);
    }
    async deleteTokensPair(currentRefresh: string) {
        await Tokens.deleteOne({ refreshToken: currentRefresh });
    }
}
