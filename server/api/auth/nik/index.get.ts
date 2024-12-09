import { NIK } from '~/server/model/NIK';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Invalid users' };
    }

    try {
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pageSize = parseInt(query.pageSize as string, 10) || 10;

        const nik = await NIK.getAllNIKs(page, pageSize);

        return {
            code: 200,
            message: 'NIKs retrieved successfully!',
            data: {
                NIK: nik
            }
        };
    } catch (error: any) {
        console.error('Error retrieving NIKs:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
