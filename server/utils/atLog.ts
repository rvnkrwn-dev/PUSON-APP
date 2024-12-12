import {Log} from "~/server/model/Log";

export const createLog = (user_id: number, action: string, device: string, ip_address: string, location: string, description: string) => {
    const logData = {
        user_id,
        action,
        device,
        ip_address,
        location,
        description,
    };
    return Log.createLog(logData);
};
