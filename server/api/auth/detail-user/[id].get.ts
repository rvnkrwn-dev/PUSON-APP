import { DetailUser } from '~/server/model/DetailUser';

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        const id = parseInt(event.context.params?.id as string);
        const detailUser = await DetailUser.getDetailUserById(id);

        if (!detailUser) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Detail user not found' };
        }

        return {
            code: 200,
            message: 'Detail pengguna berhasil dikembalikan!',
            data: detailUser,
        };
    } catch (error: any) {
        if (error.code === "P2025"){
            return { code: 404, message: 'Data tidak ditemukan' };
        }
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
