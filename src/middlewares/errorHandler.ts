import { Request, Response, NextFunction } from 'express';
import ErrorRespond, { ErrorCodeByType } from '../modules/common/errors';

export function handleError(err: any, _req: Request, res: Response, _next: NextFunction): void {
    if (err instanceof ErrorRespond) {
        res.status(ErrorCodeByType[err.type]).json(err.message);
        return;
    }

    res.status(500).json('Oops something went wrong');
}
