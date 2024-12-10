export enum UserStatus {
    Active = "active",
    Suspend = "suspend",
    Pending = "pending",
}

export enum Role {
    SuperAdmin = "super_admin",
    AdminPuskesmas = "admin_puskesmas",
    AdminPosyandu = "admin_posyandu",
    User = "user",
}

export enum StuntingStatus {
    True = "true",
    False = "false",
}

export interface User {
    id: number;
    full_name: string;
    url_profile?: string;
    secure_url_profile?: string;
    public_id_profile?: string;
    email: string;
    password: string;
    role: Role;
    status: UserStatus;
    created_at: Date;
    updated_at: Date;
    detail_user?: DetailUser[];
    logs?: Log[];
    refresh_token?: RefreshToken[];
    puskesmas?: Puskesmas[];
    staff_puskesmas?: StaffPuskesmas[];
    posyandu?: Posyandu[];
    staff_posyandu?: StaffPosyandu[];
    child?: Child[];
    med_check_up?: MedCheckUp[];
    kk?: KK[];
    nik?: NIK[];
}

export interface DetailUser {
    id: number;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: number;
    bod?: Date;
    user_id: number;
    user: User;
    created_at: Date;
    updated_at: Date;
}

export interface KK {
    id: number;
    number: bigint;
    url_kk?: string;
    secure_url_kk?: string;
    public_id_kk?: string;
    user_id: number;
    user: User;
    nik?: NIK[];
    created_at: Date;
    updated_at: Date;
}

export interface NIK {
    id: number;
    number: bigint;
    url_ktp?: string;
    secure_url_ktp?: string;
    public_id_ktp?: string;
    user_id: number;
    user: User;
    kk_id: number;
    kk: KK;
    child_id: number;
    child?: Child;
    created_at: Date;
    updated_at: Date;
}

export interface Log {
    id: number;
    user_id: number;
    user: User;
    action: string;
    description: string;
    created_at: Date;
}

export interface RefreshToken {
    id: number;
    user_id: number;
    user: User;
    refresh_token: string;
    created_at: Date;
    updated_at: Date;
}

export interface Puskesmas {
    id: number;
    name: string;
    address: string;
    phone: string;
    user_id: number;
    created_by: User;
    created_at: Date;
    updated_at: Date;
    staff?: StaffPuskesmas[];
    posyandu?: Posyandu[];
}

export interface StaffPuskesmas {
    id: number;
    name: string;
    user_id: number;
    user: User;
    puskesmas_id: number;
    puskesmas: Puskesmas;
    created_at: Date;
    updated_at: Date;
}

export interface Posyandu {
    id: number;
    name: string;
    address: string;
    phone: string;
    user_id: number;
    created_by: User;
    puskesmas_id: number;
    puskesmas: Puskesmas;
    created_at: Date;
    updated_at: Date;
    staff?: StaffPosyandu[];
    child?: Child[];
}

export interface StaffPosyandu {
    id: number;
    name: string;
    user_id: number;
    created_by: User;
    posyandu_id: number;
    posyandu: Posyandu;
    created_at: Date;
    updated_at: Date;
}

export interface Child {
    id: number;
    name: string;
    dob: Date;
    admin_id: number;
    admin: User;
    posyandu_id: number;
    posyandu: Posyandu;
    created_at: Date;
    updated_at: Date;
    med_check_up?: MedCheckUp[];
}

export interface MedCheckUp {
    id: number;
    child_id: number;
    child: Child;
    height: number;
    weight: number;
    Age: number;
    circumference: number;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    user: User;
    result_med_check_up?: ResultMedCheckUp[];
}

export interface ResultMedCheckUp {
    id: number;
    imt: number;
    ipb: number;
    status: StuntingStatus;
    med_check_up_id: number;
    med_check_up: MedCheckUp;
    created_at: Date;
    updated_at: Date;
}
