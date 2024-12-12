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
        const resultMedCheckUp = await ResultMedCheckUp.getResultMedCheckUpById(id);

        if (!resultMedCheckUp) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'ResultMedCheckUp not found' };
        }

        return {
            code: 200,
            message: 'ResultMedCheckUp retrieved successfully!',
            data: resultMedCheckUp,
        };
    } catch (error: any) {
        console.error('Error retrieving NIK:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
