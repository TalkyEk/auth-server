import bcryptjs from 'bcryptjs';
import User, { IUser } from '../../user/models/user';
import jwt from 'jsonwebtoken';
import { ErrorTypes } from '../../common/constants/errorTypes';
import userDAO from '../../user/dao';
import tokensDAO from '../dao';
import ErrorRespond from '../../../modules/common/errors';
import { TokensPair, UserInfo } from '../types/index';

type LoginData = {
    email: string;
    password: string;
};

type RefreshData = {
    userId: string;
    email: string;
};

export class AuthService {
    async login(params: LoginData): Promise<UserInfo> {
        const { email, password } = params;
        const user = await userDAO.findUser(email);

        if (!user) {
            throw new ErrorRespond(ErrorTypes.UNEXPECTED, 'Wrong email or password');
        }
        const userTokens = await tokensDAO.getUserTokens(user._id);

        if (userTokens?.length >= 5) {
            throw new ErrorRespond(ErrorTypes.UNAUTHORIZED, 'Maximum devices connected');
        }
        const isPasswordValid: boolean = bcryptjs.compareSync(password, user.password);

        if (!isPasswordValid) {
            throw new ErrorRespond(ErrorTypes.UNEXPECTED, 'Wrong email or password');
        }
        const refreshToken: string = this.signRefreshToken(user._id, user.email);
        const accessToken: string = this.signAccessToken(user._id, user.email);
        await tokensDAO.createTokensPair({ userId: user._id, accessToken, refreshToken });

        return {
            userId: user._id,
            accessToken,
            refreshToken,
        };
    }
    async register(params: LoginData): Promise<IUser> {
        const { email, password } = params;
        const findUser: IUser = await User.findOne({ email });

        if (findUser) {
            throw new ErrorRespond(ErrorTypes.UNEXPECTED, 'This email address is already being used');
        }
        const hashedPassword: string = await bcryptjs.hash(password, Number(process.env.SALT_ROUNDS));

        return userDAO.createUser({ email, password: hashedPassword });
    }
    async refresh(params: RefreshData, currentRefresh: string): Promise<TokensPair> {
        const { userId, email } = params;
        const userTokens = await tokensDAO.getUserTokens(userId);
        const activeRefresh = userTokens.find((tokensPair) => tokensPair.refreshToken === currentRefresh);

        if (!activeRefresh) {
            throw new ErrorRespond(ErrorTypes.FORBIDDEN, 'Not authorized');
        }
        const newRefreshToken: string = this.signRefreshToken(userId, email);
        const newAccessToken: string = this.signAccessToken(userId, email);

        await tokensDAO.deleteTokensPair(currentRefresh);
        await tokensDAO.createTokensPair({ userId, accessToken: newAccessToken, refreshToken: newRefreshToken });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
    signAccessToken(id: string, email: string): string {
        return jwt.sign({ userId: id, email }, process.env.ACCESS_SECRET_KEY, {
            expiresIn: process.env.ACCESS_EXPIRES_IN,
        });
    }
    signRefreshToken(id: string, email: string): string {
        return jwt.sign({ userId: id, email }, process.env.REFRESH_SECRET_KEY, {
            expiresIn: process.env.REFRESH_EXPIRES_IN,
        });
    }
}

export default new AuthService();
