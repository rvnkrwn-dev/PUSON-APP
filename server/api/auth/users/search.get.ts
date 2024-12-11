import { User } from '~/server/model/User';
import { setResponseStatus, createError, sendError, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        // Ambil parameter pencarian dari query string
        const { q } = getQuery(event);

        // Validasi parameter pencarian
        if (!q) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Search parameter is required.' };
        }

        // Cari pengguna berdasarkan nama lengkap atau email
        const users = await User.searchUser(q);

        // Set response status dan kembalikan hasil pencarian
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Users retrieved successfully.",
            data: {
                users: users
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
