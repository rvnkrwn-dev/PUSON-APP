import {Child} from "~/server/model/Child";
import {createLog} from "~/server/utils/atLog";
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'ID anak tidak valid.'};
        }

        // Check if users exists
        const user = event.context.auth.user

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const data = await readBody(event);

        // Assign users ID from the token
        const updatedData = {
            ...data,
            user_id: user.id
        };

        // Update uahsouahas in the database
        const child = await Child.updateChild(id, updatedData);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Perbarui,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data anak dengan ID ${child.id}, berhasil diperbarui `,
        }

        await createLog(payload)

        // Return the updated uahsouahas
        return {
            code: 200,
            message: 'Berhasil memperbarui data anak!',
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
