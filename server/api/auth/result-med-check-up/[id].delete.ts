import { ResultMedCheckUp } from '~/server/model/ResultMedCheckUp';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;
    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Invalid users' };
    }

    try {
        const id = parseInt(event.context.params?.id as string, 10);
        const result = await ResultMedCheckUp.deleteResultMedCheckUp(id);

        return {
            code: 200,
            message: 'ResultMedCheckUp deleted successfully!',
            data: result,
        };
    } catch (error: any) {
        console.error('Error deleting NIK:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
