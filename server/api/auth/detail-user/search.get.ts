import { DetailUser } from '~/server/model/DetailUser';

export default defineEventHandler(async (event) => {
    try {
        // Ambil parameter pencarian dari query string
        const { q } = getQuery(event);

        // Validasi parameter pencarian
        if (typeof q !== 'string' || !q) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Search parameter is required and must be a string.' };
        }

        // Cari pengguna berdasarkan nama lengkap atau email
        const detailUser = await DetailUser.searchDetailUser(q);

        // Set response status dan kembalikan hasil pencarian
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "DetailUser retrieved successfully.",
            data: {
                users: detailUser
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
