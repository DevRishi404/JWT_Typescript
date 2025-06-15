
export interface LoginReqBody {
    email: string;
    password: string;
}

export interface LoginResBody {
    message: string;
    user: {
        name: string;
        email: string;
        gender: string;
    }
}

export interface User {
    name: string;
    email: string;
    gender: string;
}