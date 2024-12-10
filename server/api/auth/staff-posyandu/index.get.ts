import { StaffPosyandu } from '~/server/model/StaffPosyandu';

export default defineEventHandler(async (event) => {
    try {
        // Periksa apakah pengguna ada
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

        // Panggil fungsi `getAllStaffPosyandu` dari UserService
        const staff_posyandu = await StaffPosyandu.getAllStaffPosyandu(page, pagesize);

        // Hitung total halaman (ini hanya contoh, sesuaikan dengan kebutuhan Anda)
        const totalUsers = await StaffPosyandu.countAllStaffPosyandu();
        const totalPages = Math.ceil(totalUsers / pagesize);

        // Buat URL untuk prev dan next
        const baseUrl = "/api/auth/staff-posyandu";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        return {
            code: 200,
            message: 'Staff Posyandu fetched successfully!',
            data: staff_posyandu,
            totalPages,
            prev: prevPage,
            next: nextPage,
        };
    } catch (error: any) {
        console.error('Error fetching Staff Posyandu:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
