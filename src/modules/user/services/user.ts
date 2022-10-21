import { IUser } from '../models/user';
import userDAO from '../dao';

export class UserService {
    async getUsers(): Promise<IUser[]> {
        return await userDAO.getUsers();
    }
    async getUser(params): Promise<IUser[]> {
        return await userDAO.getUser();
    }
}

export default new UserService();
