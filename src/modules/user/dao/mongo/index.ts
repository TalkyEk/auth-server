import User, { IUser } from '../../../user/models/user';

interface createUser {
    email: string;
    password: string;
}

export class MongoUserDAO {
    async createUser(params: createUser) {
        return User.create(params);
    }
    async findUser(email: string) {
        return User.findOne({ email });
    }
    async getUsers(): Promise<IUser[]> {
        return User.find();
    }
    async getUser(_id: string): Promise<IUser[]> {
        return User.findOne({_id: param});
    }
}
