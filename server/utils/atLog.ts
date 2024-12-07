import {Log} from "~/server/model/Log";

// Utility function to create a log entry
export const createLog = async (user_id: number, action: string, description: string): Promise<boolean> => {
    try {
        const log = await Log.createLog(user_id, action, description);
        return true
    } catch (e) {
        return false;
    }
};