import type {Role, UserStatus, User, ChildStatus, Gender, StuntingStatus} from "~/types/TypesModel";

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
    device: string;
    ip_address: string;
    location: string;
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
    user_id: number;
    kk_id: number;
    child_id?: number; // Optional
}

export interface ChildRequest {
    name: string;
    bod: Date; // ISO string format for date
    age: number;
    gender: Gender; // Use enum values
    status: ChildStatus; // Use enum values
    user_id: number;
    posyandu_id: number;
}

export interface MedCheckUpRequest {
    child_id: number;
    height: number;
    weight: number;
    Age: number;
    circumference: number;
    user_id: number;
}

export interface ResultMedCheckUpRequest {
    imt: number;
    ipb: number;
    status: StuntingStatus;
    med_check_up_id: number;
}
