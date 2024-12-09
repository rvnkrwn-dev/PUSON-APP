import { KK } from '~/server/model/KK';

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

        const kk = await KK.getAllKKs(page, pageSize);

        return {
            code: 200,
            message: 'KK retrieved successfully!',
            data: {
                KK: kk
            }
        };
    } catch (error: any) {
        console.error('Error retrieving KKs:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
