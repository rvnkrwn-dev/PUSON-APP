import {LogRequest, PuskesmasRequest} from '~/types/AuthType';
import {Puskesmas} from "~/server/model/Puskesmas";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Invalid health-centers ID.'};
        }

        // Check if users exists
        const user = event.context.auth.user

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid users' };
        }

        const data: PuskesmasRequest = await readBody(event);

        // Assign users ID from the token
        const updatedData = {
            ...data,
            user_id: user.id
        };

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Perbarui,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data puskesmas dengan ID ${id}, berhasil diperbarui`,
        }

        await createLog(payload)

        // Update Puskesmas in the database
        const puskesmas = await Puskesmas.updatePuskesmas(id, updatedData);

        // Return the updated Puskesmas
        return {
            code: 200,
            message: 'Puskesmas updated successfully!',
            data: {
                puskesmas
            },
        };
    } catch (error: any) {
        console.error('Error updating Puskesmas:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
