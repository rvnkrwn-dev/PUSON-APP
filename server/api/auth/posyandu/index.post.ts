import { defineEventHandler, readBody, sendError, createError } from 'h3';
import { Posyandu } from '~/server/model/Posyandu';

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            event.res.statusCode = 403;
            return { code: 403, message: 'Invalid user' };
        }

        // Read the request body
        const data = await readBody(event);

        // Assign user's ID from the token
        const newData = {
            ...data,
            user_id: user.id,
        };

        const posyandu = await Posyandu.createPosyandu(newData);

        return {
            code: 201,
            message: 'Posyandu created successfully!',
            data: posyandu,
        };
    } catch (error: any) {
        console.error('Error creating Posyandu:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
