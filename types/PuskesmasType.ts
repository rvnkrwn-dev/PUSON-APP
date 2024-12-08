export interface PuskesmasType {
    id: number;
    name: string;
    address: string;
    phone: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    created_by?: any;
    staff?: any[];
    posyandu?: any[];
}