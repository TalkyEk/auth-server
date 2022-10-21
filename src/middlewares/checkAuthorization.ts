import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorTypes } from '../modules/common/constants/errorTypes';
import { JwtError, TokenInfoRequest, UserTokenInfo } from '../modules/common/types';
import { ErrorCodeByType } from '../modules/common/errors';

export async function checkAuthorization(req: TokenInfoRequest, res: Response, next: NextFunction): Promise<void> {
    const accessToken: string = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        res.status(ErrorCodeByType[ErrorTypes.FORBIDDEN]).json({ message: 'Not authorized' });
        return;
    }

    jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err: JwtError, decoded: UserTokenInfo) => {
        if (err) {
            res.status(ErrorCodeByType[ErrorTypes.FORBIDDEN]).json({ message: err.message });
        }
        req.userTokenInfo = decoded;
    });
    next();
}
