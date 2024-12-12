import { MedCheckUp } from '~/server/model/MedCheckUp';

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

        const kk = await MedCheckUp.updateMedCheckUp(id, data);

        return {
            code: 200,
            message: 'MedCheckUp updated successfully!',
            data: kk,
        };
    } catch (error: any) {
        console.error('Error updating MedCheckUp:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
