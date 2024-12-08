// Define the LogType interface
export interface LogType {
    id: number;
    user_id: number;
    action: string;
    description: string;
    created_at: Date;
    user?: {
        id: number;
        full_name: string;
        email: string;
    };
}