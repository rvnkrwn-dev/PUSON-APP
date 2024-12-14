import { DetailUser } from '~/server/model/DetailUser';
import {DetailUserRequest, LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {


    try {
        // Check if user exists
        const user = event.context?.auth?.user;

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        const id = parseInt(event.context.params?.id as string);
        // Read the request body
        const data: DetailUserRequest = await readBody(event);
        // Assign users ID from the token
        const updatedData = {
            ...data,
            user_id: user.id
        };

        const detailUser = await DetailUser.updateDetailUser(id, updatedData);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Perbarui,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data Detail Pengguna dengan ID ${user.id}, berhasil diperbarui`,
        }

        await createLog(payload)

        return {
            code: 200,
            message: 'Detail pengguna berhasil diperbarui!',
            data: detailUser,
        };
    } catch (error: any) {
        if (error.code === "P2025"){
            return { code: 404, message: 'Data tidak ditemukan' };
        }
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
