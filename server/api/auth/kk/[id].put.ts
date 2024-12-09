import { KK } from '~/server/model/KK';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Invalid users' };
    }

    try {
        const id = parseInt(event.context.params?.id as string);
        // Read the request body
        const data = await readBody(event);

        const kk = await KK.updateKK(id, data);

        return {
            code: 200,
            message: 'KK updated successfully!',
            data: kk,
        };
    } catch (error: any) {
        console.error('Error updating KK:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
