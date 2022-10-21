import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { ErrorTypes } from '../../common/constants/errorTypes';
import { ErrorCodeByType } from '../../common/errors';

const emailCheck = check('email', 'incorrect email').isEmail();
const passwordCheck = check('password', 'password length must be at least 6').isLength({ min: 6, max: 50 });

export const registerValidation = [emailCheck, passwordCheck];

export const loginValidation = [emailCheck, passwordCheck];

export function checkValidation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(ErrorCodeByType[ErrorTypes.UNEXPECTED]).json(errors.array());
    } else {
        next();
    }
}
