import { DetailUser } from '~/server/model/DetailUser';
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

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

        // Assign users ID from the token
        const newData = {
            ...data,
            user_id: user.id
        };


        const detailUser = await DetailUser.createDetailUser(newData);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Hapus,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data Detail Pengguna dengan ID ${user.id}, berhasil diperbarui`,
        }

        await createLog(payload)

        return {
            code: 201,
            message: 'Detail pengguna berhasil ditambah!',
            data: detailUser,
        };
    } catch (error: any) {
        if (error.code === "P2025"){
            return { code: 404, message: 'Data tidak ditemukan' };
        }
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
