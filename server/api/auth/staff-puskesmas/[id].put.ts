import { StaffPuskesmas } from '~/server/model/StaffPuskesmas';

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        const id = parseInt(event.context.params?.id as string, 10);
        const data = await readBody(event);

        const updatedStaffPuskesmas = await StaffPuskesmas.updateStaffPuskesmas(id, data);

        return {
            code: 200,
            message: 'Staff Puskesmas updated successfully!',
            data: updatedStaffPuskesmas,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
