import { MedCheckUp } from '~/server/model/MedCheckUp';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context?.auth?.user;

    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Invalid users' };
    }

    try {
        const id = parseInt(event.context.params?.id as string);
        const kk = await MedCheckUp.getMedCheckUpById(id);

        if (!kk) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'MedCheckUp not found' };
        }

        return {
            code: 200,
            message: 'MedCheckUp retrieved successfully!',
            data: kk,
        };
    } catch (error: any) {
        console.error('Error retrieving MedCheckUp:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
