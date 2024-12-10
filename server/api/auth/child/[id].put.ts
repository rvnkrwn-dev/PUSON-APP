import {Child} from "~/server/model/Child";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Invalid child ID.'};
        }

        // Check if users exists
        const user = event.context.auth.user

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid users' };
        }

        const data = await readBody(event);

        // Assign users ID from the token
        const updatedData = {
            ...data,
            user_id: user.id
        };

        // Update uahsouahas in the database
        const child = await Child.updateChild(id, updatedData);

        // Return the updated uahsouahas
        return {
            code: 200,
            message: 'Child updated successfully!',
            data: {
                child
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
