import { DetailUser } from '~/server/model/DetailUser';

export default defineEventHandler(async (event) => {


    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        // Ambil parameter `page` dan `pagesize` dari query string
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pagesize = parseInt(query.pagesize as string, 10) || 10;

        // Validasi input
        if (page <= 0 || pagesize <= 0) {
            throw createError({
                statusCode: 400,
                message: "Page and pagesize must be positive integers.",
            });
        }
        const detailUsers = await DetailUser.getAllDetailUsers(page, pagesize);
        return {
            code: 200,
            message: 'Detail users retrieved successfully!',
            data: detailUsers,
        };
    } catch (error: any) {
        console.error('Error retrieving detail users:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
