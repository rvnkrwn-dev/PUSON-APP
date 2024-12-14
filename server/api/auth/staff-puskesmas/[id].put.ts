import { StaffPuskesmas } from '~/server/model/StaffPuskesmas';
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tida valid' };
        }

        const id = parseInt(event.context.params?.id as string, 10);
        const data = await readBody(event);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Perbarui,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data staff puskesmas dengan ID ${id}, berhasil diperbarui`,
        }

        await createLog(payload)

        const updatedStaffPuskesmas = await StaffPuskesmas.updateStaffPuskesmas(id, data);

        return {
            code: 200,
            message: 'Staff Puskesmas berhasil diperbarui!',
            data: updatedStaffPuskesmas,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
