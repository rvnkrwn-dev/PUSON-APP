import { Posyandu } from '~/server/model/Posyandu';

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            event.res.statusCode = 403;
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const id = parseInt(event.context.params?.id as string, 10);
        const posyandu = await Posyandu.getPosyanduById(id);

        if (!posyandu) {
            event.res.statusCode = 404;
            return { code: 404, message: 'Posyandu tidak ditemukan' };
        }

        return {
            code: 200,
            message: 'Data posyandu berhasil dikembalikan!',
            data: posyandu,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
