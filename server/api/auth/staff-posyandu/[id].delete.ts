import { StaffPosyandu } from '~/server/model/StaffPosyandu';
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

        const id = parseInt(event.context.params?.id as string, 10);

        const data = await readBody(event)

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Hapus,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data staff posyandu dengan ID ${id}, berhasil dihapus`,
        }

        await createLog(payload)

        const deletedStaffPosyandu = await StaffPosyandu.deleteStaffPosyandu(id);

        return {
            code: 200,
            message: 'Staff Posyandu berhasil dihapus!',
            data: deletedStaffPosyandu,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
