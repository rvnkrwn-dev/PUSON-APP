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
        // Read the request body
        const data = await readBody(event);

        const nikchild = await NIKChild.updateNIKChild(id, data);

        return {
            code: 200,
            message: 'NIK updated successfully!',
            data: nikchild,
        };
    } catch (error: any) {
        console.error('Error updating NIK:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
