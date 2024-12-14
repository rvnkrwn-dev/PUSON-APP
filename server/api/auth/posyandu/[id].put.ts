import { Posyandu } from '~/server/model/Posyandu';
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            event.res.statusCode = 403;
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const id = parseInt(event.context.params?.id as string, 10);
        const data = await readBody(event);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Tambah,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data posyandu dengan ID ${id}, berhasil diperbarui`,
        }

        await createLog(payload)

        const updatedPosyandu = await Posyandu.updatePosyandu(id, data);

        return {
            code: 200,
            message: 'Data posyandu berhasil diperbarui!',
            data: updatedPosyandu,
        };
    } catch (error: any) {
        console.error('Error updating Posyandu:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
