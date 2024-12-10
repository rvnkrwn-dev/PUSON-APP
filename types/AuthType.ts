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

export interface LogRequest {
    user_id: number;
    action: string;
    description: string;
}

export interface PuskesmasRequest {
    name: string;
    address: string;
    phone: string;
    user_id: number;
}

export interface DetailUserRequest {
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: number;
    bod?: Date;
    user_id: number;
}

export interface KKRequest {
    number: string;
    user_id: number;
}

export interface NIKRequest {
    number: string;
    user_id: number;
    kk_id: number;
}

export interface StaffPuskesmasRequest {
    name: string;
    user_id: number;
    puskesmas_id: number;
}

export interface PosyanduRequest {
    name: string;
    address: string;
    phone: string;
    user_id: number;
    puskesmas_id: number;
}

export interface StaffPosyanduRequest {
    name: string;
    user_id: number;
    posyandu_id: number;
}

export interface NIKChildRequest {
    number: string;
    userId: number;
    kkId: number;
    childId?: number; // Optional
}

export interface ChildRequest {
    name: string;
    dob: string; // ISO string format for date
    gender: 'male' | 'female'; // Use enum values
    status: 'active' | 'suspend' | 'pending'; // Use enum values
    userId: number;
    posyanduId: number;
}

