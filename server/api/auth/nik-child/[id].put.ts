import { NIKChild } from '~/server/model/NIKChild';
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
        const id = parseInt(event.context.params?.id as string, 10);
        // Read the request body
        const data = await readBody(event);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Perbarui,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `NIK dengan ID ${id}, berhasil diperbarui`,
        }

        const nikchild = await NIKChild.updateNIKChild(id, data);

        return {
            code: 200,
            message: 'NIK Anak berhasil diperbarui!',
            data: nikchild,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
