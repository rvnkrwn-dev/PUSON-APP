import { NIK } from '~/server/model/NIK';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Invalid users' };
    }

    try {
        // Read the request body
        const data = await readBody(event);

        // Assign user ID from the token
        const newData = {
            ...data,
            user_id: user.id
        };

        const nik = await NIK.createNIK(newData);

        return {
            code: 201,
            message: 'NIK created successfully!',
            data: nik,
        };
    } catch (error: any) {
        console.error('Error creating NIK:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
