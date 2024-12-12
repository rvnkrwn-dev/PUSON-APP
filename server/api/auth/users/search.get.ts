import { User } from '~/server/model/User';
import { setResponseStatus, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        // Ambil parameter pencarian dari query string
        const { q } = getQuery(event);

        // Validasi parameter pencarian
        if (typeof q !== 'string' || !q) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Search parameter is required and must be a string.' };
        }

        // Check if user exists
        const authUser = event.context.auth?.user;

        if (!authUser) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        // Cari pengguna berdasarkan nama lengkap atau email
        const users = await User.searchUser(q);

        // Hapus pengguna yang sedang terautentikasi dari hasil pencarian
        const filteredUsers = users.filter(usr => usr.id !== authUser.id);


        // Set response status dan kembalikan hasil pencarian
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Users retrieved successfully.",
            data: {
                users: filteredUsers
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
