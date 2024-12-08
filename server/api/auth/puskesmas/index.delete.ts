import {PuskesmasType} from "~/types/TypesModel";
import {Puskesmas} from "~/server/model/Puskesmas";

export default defineEventHandler(async (event) => {
    try {

        // Check if user exists
        const user = event.context.auth.user

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        // Delete Puskesmas from the database
        const puskesmas: PuskesmasType = await Puskesmas.deletePuskesmas(user.id);

        // Return the deleted Puskesmas
        return {
            code: 200,
            message: 'Puskesmas deleted successfully!',
            data: {
                puskesmas
            },
        };
    } catch (error: any) {
        console.error('Error deleting Puskesmas:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
