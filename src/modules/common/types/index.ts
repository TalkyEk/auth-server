import { Request, Router } from 'express';

export type UserTokenInfo = {
    userId: string;
    email: string;
};

type TokenInfoReq = {
    userTokenInfo: UserTokenInfo;
};

export type JwtError = {
    message: string;
};

export type Module = {
    router?: Router;
};

export type TokenInfoRequest = Request & TokenInfoReq;
