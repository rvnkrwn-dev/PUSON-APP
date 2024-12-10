import {Log} from "~/server/model/Log";

export const createLog = (user_id: number, action: string, description: string) => {
    const logData = {
        user_id,
        action,
        description,
    };
    return Log.createLog(logData);
};
