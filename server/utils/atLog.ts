import { Log } from "~/server/model/Log";
import {LogRequest} from "~/types/AuthType";

export const createLog = async (data: LogRequest) => {
    const logData = {
        user_id : data.user_id,
        action : data.action,
        device : data.device,
        ip_address : data.ip_address,
        location : data.location,
        description : data.description,
    };
    return Log.createLog(logData);
};
