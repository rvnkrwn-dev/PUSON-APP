import { Child } from '~/server/model/Child';
import { setResponseStatus, createError, sendError } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        // Periksa apakah pengguna ada
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        const data = await readBody(event);

        // Assign user's ID from the token
        const newData = {
            ...data,
            userId: user.id // Gunakan user_id di sini
        };

        // Periksa apakah `posyandu_id` tersedia
        if (!newData.posyanduId) {
            throw createError({
                statusCode: 400,
                message: "posyandu_id is required."
            });
        }

        // Create Child in the database
        const child = await Child.createChild(newData);

        // Return the newly created Child
        return {
            code: 201,
            message: 'Child created successfully!',
            data: {
                child
            },
        };
    } catch (error: any) {
        console.error('Error creating child:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
