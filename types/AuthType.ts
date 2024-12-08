import type {Role, UserStatus, User} from "~/types/TypesModel";

export interface RegisterRequest {
    full_name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    code: number,
    message: string,
    data: {
        user: User,
    },
}

export interface LoginRequest {
    email: string;
    password: string;
    ip_address: string;
}

export interface LoginResponse {
    code: number,
    message: string,
    access_token: string,
    data: {
        user: User,
    },
}

export interface PuskesmasRequest {
    name: string;
    address: string;
    phone: string;
    user_id: number;
}


