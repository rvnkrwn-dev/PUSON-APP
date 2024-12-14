import { ResultMedCheckUp } from '~/server/model/ResultMedCheckUp';
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

        const data = await readBody(event)

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Hapus,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data hasil pemeriksaan dengan ID ${id}, berhasil dihapus`,
        }

        await createLog(payload)

        const result = await ResultMedCheckUp.deleteResultMedCheckUp(id);

        return {
            code: 200,
            message: 'Data hasil pemeriksaan berhasil dihapus!',
            data: result,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
