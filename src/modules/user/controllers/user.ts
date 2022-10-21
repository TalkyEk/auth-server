import { Request, Response } from 'express';
import userService from '../services/user';

export class UserController {
    async getUsers(_req: Request, res: Response): Promise<void> {
        const users = await userService.getUsers();
        res.json(users);
    }
    async getUser(req: Request, res: Response): Promise<void> {
        const user = await userService.getUser(req.body);
        res.json(user);
    }
}

export default new UserController();
