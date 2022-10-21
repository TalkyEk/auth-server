import { Request, Response } from 'express';
import authService from '../services/auth';
import { TokenInfoRequest } from '../../common/types';

export class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        const tokensPair = await authService.login(req.body);
        res.json(tokensPair);
    }
    async register(req: Request, res: Response): Promise<void> {
        const user = await authService.register(req.body);
        res.json(user);
    }
    async refresh(req: TokenInfoRequest, res: Response): Promise<void> {
        const tokensPair = await authService.refresh(req.userTokenInfo, req.body.refreshToken);
        res.json(tokensPair);
    }
}

export default new AuthController();
