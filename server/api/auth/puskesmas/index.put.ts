import { PuskesmasRequest } from '~/types/AuthType';
import { PuskesmasType } from '~/types/TypesModel';
import {Puskesmas} from "~/server/model/Puskesmas";

export default defineEventHandler(async (event) => {
    try {

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

        // Update Puskesmas in the database
        const puskesmas: PuskesmasType = await Puskesmas.updatePuskesmas(user.id, updatedData);

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
