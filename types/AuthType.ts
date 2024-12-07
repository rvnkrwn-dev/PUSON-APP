import {Role} from "~/types/TypesModel";

export interface RegisterRequest {
    full_name: string;
    email: string;
    password: string;
}

export interface CreateRequest {
    full_name: string;
    email: string;
    password: string;
    role: Role;  // Default can be 'user' or 'admin_puskesmas', etc.
    url_profile?: string | null;  // Optional
    secure_url_profile?: string | null;  // Optional
    public_id_profile?: string | null;  // Optional
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    reset_token: string;
    new_password: string;
    confirm_password: string;  // Optional, used for validation to ensure password confirmation matches
}