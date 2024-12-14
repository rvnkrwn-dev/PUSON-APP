import { StaffPuskesmas } from '~/server/model/StaffPuskesmas';

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const id = parseInt(event.context.params?.id as string, 10);
        const staffPuskesmas = await StaffPuskesmas.getStaffPuskesmasById(id);

        if (!staffPuskesmas) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Staff Puskesmas tidak ditemukan' };
        }

        return {
            code: 200,
            message: 'Staff Puskesmas berhasil dikembalikan!',
            data: staffPuskesmas,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
