import { User } from "~/server/model/User";

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

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

        // Hitung total halaman (ini hanya contoh, sesuaikan dengan kebutuhan Anda)
        const totalUsers = await User.countAllUsers();
        const totalPages = Math.ceil(totalUsers / pagesize);

        // Buat URL untuk prev dan next
        const baseUrl = "/api/auth/users";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        // Return hasil data
        return {
            message: "Users retrieved successfully.",
            data: {
                users
            },
            meta: {
                totalPages,
                prev: prevPage,
                next: nextPage,
            }
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({statusCode: 500, statusMessage: error?.message || 'Internal Server Error'})
        );
    }
});
