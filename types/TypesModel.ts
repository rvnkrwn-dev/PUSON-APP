// Enum definitions
export enum Role {
    super_admin = 'super_admin',
    admin_puskesmas = 'admin_puskesmas',
    admin_posyandu = 'admin_posyandu',
    user = 'user',
}

export enum StuntingStatus {
    true = 'true',
    false = 'false',
}

// Model interfaces with specific names

export interface UserType {
    id: number;
    full_name: string;
    url_profile: string | null;  // Optional field
    secure_url_profile: string | null;  // Optional field
    public_id_profile: string | null;  // Optional field
    email: string;
    password: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
    logs: LogType[];
    refresh_token: RefreshTokenType[];
    puskesmas: PuskesmasType[];
    staff_puskesmas: StaffPuskesmasType[];
    posyandu: PosyanduType[];
    staff_posyandu: StaffPosyanduType[];
    child: ChildType[];
    med_check_up: MedCheckUpType[];
    detail_user: DetailUserType[];
}

export interface DetailUserType {
    phone?: number | null;
    address?: string | null;
    city?: string | null;
    postalCode?: number | null;
    bod?: Date | null;
    user_id: number;
    user?: UserType[] | null;
}

export interface LogType {
    id: number;
    user_id: number;
    user: UserType;
    action: string;
    description: string;
    created_at: Date;
}

export interface RefreshTokenType {
    id: number;
    user_id: number;
    user: UserType;
    refresh_token: string;
    created_at: Date;
    updated_at: Date;
}

export interface PuskesmasType {
    id: number;
    name: string;
    address: string;
    phone: number;
    user_id: number;
    created_by: UserType;
    created_at: Date;
    updated_at: Date;
    staff: StaffPuskesmasType[];
    posyandu: PosyanduType[];
}

export interface StaffPuskesmasType {
    id: number;
    name: string;
    user_id: number;
    user: UserType;
    puskesmas_id: number;
    puskesmas: PuskesmasType;
    created_at: Date;
    updated_at: Date;
}

export interface PosyanduType {
    id: number;
    name: string;
    address: string;
    phone: number;
    user_id: number;
    created_by: UserType;
    puskesmas_id: number;
    puskesmas: PuskesmasType;
    created_at: Date;
    updated_at: Date;
    staff: StaffPosyanduType[];
    child: ChildType[];
}

export interface StaffPosyanduType {
    id: number;
    name: string;
    user_id: number;
    created_by: UserType;
    posyandu_id: number;
    posyandu: PosyanduType;
    created_at: Date;
    updated_at: Date;
}

export interface ChildType {
    id: number;
    name: string;
    admin_id: number;
    admin: UserType;
    posyandu_id: number;
    posyandu: PosyanduType;
    created_at: Date;
    updated_at: Date;
    med_check_up: MedCheckUpType[];
}

export interface MedCheckUpType {
    id: number;
    child_id: number;
    child: ChildType;
    height: number;
    weight: number;
    Age: number;
    circumference: number;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    user: UserType;
    result_med_check_up: ResultMedCheckUpType[];
}

export interface ResultMedCheckUpType {
    id: number;
    imt: number;
    ipb: number;
    status: StuntingStatus;
    med_check_up_id: number;
    med_check_up: MedCheckUpType;
    created_at: Date;
    updated_at: Date;
}