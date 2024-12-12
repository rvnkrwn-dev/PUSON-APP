import type {DetailUser, Role, UserStatus} from "~/types/TypesModel";

export type getUserByEmailType = {
    id: number;
    full_name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    role: Role;
    url_profile?: string | null;
    secure_url_profile?: string | null;
    public_id_profile?: string | null;
    status: UserStatus;
    detail_user: DetailUser[];
};

export type UpdateUserType = {
    full_name?: string;
    url_profile?: string;
    secure_url_profile?: string;
    public_id_profile?: string;
    email?: string;
    password?: string;
    role?: Role;
    status?: UserStatus;
};
