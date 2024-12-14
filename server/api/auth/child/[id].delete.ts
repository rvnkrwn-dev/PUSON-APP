import {Child} from "~/server/model/Child";
import {createLog} from "~/server/utils/atLog";
import {LogDeleteRequest, LogRequest} from "~/types/AuthType";
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
            return {code: 400, message: 'ID anak tidak valid'};
        }

        const data: LogDeleteRequest = await readBody(event);

        // Delete Puskesmas from the database
        const child = await Child.deleteChild(id);

        if (!child) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Data anak tidak ditemukan' };
        }

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Hapus,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data anak dengan ID ${child.id}, berhasil dihapus `,
        }

        await createLog(payload)

        // Return the deleted Puskesmas
        return {
            code: 200,
            message: 'Data anak berhasil dihapus!',
            data: {
                child
            },
        };
    } catch (error: any) {
        if (error.code === "P2025"){
            return { code: 404, message: 'Data tidak ditemukan' };
        }
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
