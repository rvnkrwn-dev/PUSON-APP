import { KK } from '~/server/model/KK';
import {ActionLog} from "~/types/TypesModel";
import {LogRequest} from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Pengguna tidak valid' };
    }

    try {
        const id = parseInt(event.context.params?.id as string);
        // Read the request body
        const data = await readBody(event);

        const kk = await KK.updateKK(id, data);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Perbarui,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data KK dengan ID ${id}, berhasil diperbarui`,
        }

        await createLog(payload)

        return {
            code: 200,
            message: 'KK berhasil diperbarui!',
            data: kk,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
