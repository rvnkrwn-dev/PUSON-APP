import {Puskesmas} from "~/server/model/Puskesmas";
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        // Check if users exists
        const user = event.context.auth.user

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const id = parseInt(event.context.params?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'ID tidak valid.'};
        }

        const data = await readBody(event)

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Hapus,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data puskesmas dengan ID ${id}, berhasil dihapus`,
        }

        await createLog(payload)

        // Delete Puskesmas from the database
        const puskesmas = await Puskesmas.deletePuskesmas(id);

        // Return the deleted Puskesmas
        return {
            code: 200,
            message: 'Data puskesmas berhasil dihapus!',
            data: {
                puskesmas
            },
        };
    } catch (error: any) {
        console.error('Error deleting Puskesmas:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
