import { NIK } from '~/server/model/NIK';
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Pengguna tidak valid' };
    }

    try {
        // Read the request body
        const data = await readBody(event);

        // Assign user ID from the token
        const newData = {
            ...data,
            user_id: user.id
        };

        const nik = await NIK.createNIK(newData);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Tambah,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `NIK dengan ID ${user.id}, berhasil ditambahkan`,
        }

        await createLog(payload)

        return {
            code: 201,
            message: 'NIK berhasil ditambahkan!',
            data: nik,
        };
    } catch (error: any) {
        console.error('Error creating NIK:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
