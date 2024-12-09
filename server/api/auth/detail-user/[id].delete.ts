import { DetailUser } from '~/server/model/DetailUser';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context?.auth?.user;
    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Invalid user' };
    }

    try {
        const id = parseInt(event.context.params?.id as string);
        const detailUser = await DetailUser.deleteDetailUser(id);

        return {
            code: 200,
            message: 'Detail user deleted successfully!',
            data: detailUser,
        };
    } catch (error: any) {
        console.error('Error deleting detail user:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
