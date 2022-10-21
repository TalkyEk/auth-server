import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorTypes } from '../modules/common/constants/errorTypes';
import { JwtError, TokenInfoRequest, UserTokenInfo } from '../modules/common/types';
import { ErrorCodeByType } from '../modules/common/errors';

export async function checkRefreshToken(req: TokenInfoRequest, res: Response, next: NextFunction): Promise<void> {
    const refreshToken: string = req.body?.refreshToken;

    if (!refreshToken) {
        res.status(ErrorCodeByType[ErrorTypes.FORBIDDEN]).json({ message: 'Not authorized' });
        return;
    }
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err: JwtError, decoded: UserTokenInfo) => {
        if (err) {
            res.status(ErrorCodeByType[ErrorTypes.FORBIDDEN]).json({ message: err.message });
        }
        req.userTokenInfo = decoded;
    });
    next();
}
