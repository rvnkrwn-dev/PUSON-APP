import { StaffPosyandu } from '~/server/model/StaffPosyandu';
import {ActionLog} from "~/types/TypesModel";
import {LogRequest} from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        // Read the request body
        const data = await readBody(event);

        // Assign user's ID from the token
        const newData = {
            ...data,
            user_id: user.id,
        };

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Tambah,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data staff posyandu dengan ID ${user.id}, berhasil ditambahkan`,
        }

        await createLog(payload)

        const staffPosyandu = await StaffPosyandu.createStaffPosyandu(newData);

        return {
            code: 201,
            message: 'Staff Posyandu berhasil ditambahkan!',
            data: staffPosyandu,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
