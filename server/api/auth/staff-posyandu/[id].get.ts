import { StaffPosyandu } from '~/server/model/StaffPosyandu';

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const id = parseInt(event.context.params?.id as string, 10);
        const staffPosyandu = await StaffPosyandu.getStaffPosyanduById(id);

        if (!staffPosyandu) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Staff Posyandu tidak ditemukan' };
        }

        return {
            code: 200,
            message: 'Staff Posyandu berhasil dikembalikan!',
            data: staffPosyandu,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
