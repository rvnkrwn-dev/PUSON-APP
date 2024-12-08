import { User } from "~/server/model/User";

export default defineEventHandler(async (event) => {
    try {
        // Ambil parameter `page` dan `pagesize` dari query string
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pagesize = parseInt(query.pagesize as string, 10) || 10;

        // Validasi input
        if (page <= 0 || pagesize <= 0) {
            throw createError({
                statusCode: 400,
                message: "Page and pagesize must be positive integers.",
            });
        }

        // Panggil fungsi `getAllUsers` dari UserService
        const users = await User.getAllUsers(page, pagesize);

        // Return hasil data
        return {
            message: "Users retrieved successfully.",
            data: users,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({statusCode: 500, statusMessage: error?.message || 'Internal Server Error'})
        );
    }
});
