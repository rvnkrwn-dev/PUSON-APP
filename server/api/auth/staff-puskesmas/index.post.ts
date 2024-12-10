import { StaffPuskesmas } from '~/server/model/StaffPuskesmas';

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        // Read the request body
        const data = await readBody(event);

        // Assign user's ID from the token
        const newData = {
            ...data,
            user_id: user.id,
        };

        const staffPuskesmas = await StaffPuskesmas.createStaffPuskesmas(newData);

        return {
            code: 201,
            message: 'Staff Puskesmas created successfully!',
            data: staffPuskesmas,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
