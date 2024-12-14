import { NIKChild } from '~/server/model/NIKChild';

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Pengguna tidak valid' };
    }

    try {
        const id = parseInt(event.context.params?.id as string, 10);
        const nikchild = await NIKChild.getNIKChildById(id);

        if (!nikchild) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'NIK Anak tidak ditemukan' };
        }

        return {
            code: 200,
            message: 'NIK Anak berhasil dikembalikan!',
            data: nikchild,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
