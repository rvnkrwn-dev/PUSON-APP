import { NIKChild } from '~/server/model/NIKChild';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;
    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Invalid users' };
    }

    try {
        const id = parseInt(event.context.params?.id as string, 10);
        const nikchild = await NIKChild.deleteNIKChild(id);

        return {
            code: 200,
            message: 'NIK deleted successfully!',
            data: nikchild,
        };
    } catch (error: any) {
        console.error('Error deleting NIK:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
