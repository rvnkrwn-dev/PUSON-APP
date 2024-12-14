import { User } from '~/server/model/User';
import {createLog} from "~/server/utils/atLog";
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;

        const id = parseInt(event.context.params?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Pengguna tidak valid'};
        }

        const data = await readBody(event)

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Hapus,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data pengguna dengan ID ${id}, berhasil dihapus`,
        }

        await createLog(payload)

        // Delete the users
        await User.deleteUser(id);

        // Set response status and return success response
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Akun pengguna berhasil dihapus!",
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
