import { StaffPosyandu } from '~/server/model/StaffPosyandu';
import {ActionLog} from "~/types/TypesModel";
import {LogRequest} from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const id = parseInt(event.context.params?.id as string, 10);
        const data = await readBody(event);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Perbarui,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data staff posyandu dengan ID ${id}, berhasil diperbarui`,
        }

        await createLog(payload)

        const updatedStaffPosyandu = await StaffPosyandu.updateStaffPosyandu(id, data);

        return {
            code: 200,
            message: 'Staff Posyandu berhasil diperbarui!',
            data: updatedStaffPosyandu,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
