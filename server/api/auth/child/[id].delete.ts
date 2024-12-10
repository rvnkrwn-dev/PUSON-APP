import {Child} from "~/server/model/Child";

export default defineEventHandler(async (event) => {
    try {
        // Check if users exists
        const user = event.context.auth.user

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid users' };
        }

        const id = parseInt(event.context.params?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Invalid child ID.'};
        }

        // Delete Puskesmas from the database
        const child = await Child.deleteChild(id);

        // Return the deleted Puskesmas
        return {
            code: 200,
            message: 'Child deleted successfully!',
            data: {
                child
            },
        };
    } catch (error: any) {
        console.error('Error deleting child:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
