export default class ErrorRespond {
    type: string;
    message: string;

    constructor(type: string, message: string) {
        this.type = type;
        this.message = message;
    }
}

export const ErrorCodeByType = {
    UNEXPECTED: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
};
