import { StaffPuskesmas } from '~/server/model/StaffPuskesmas';

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

        // Ambil data Staff Puskesmas
        const staff_puskesmas = await StaffPuskesmas.getAllStaffPuskesmas(page, pagesize);

        // Hitung total halaman
        const totalUsers = await StaffPuskesmas.countAllStaffPuskesmas();
        const totalPages = Math.ceil(totalUsers / pagesize);

        // Buat URL untuk prev dan next
        const baseUrl = "/api/auth/staff-puskesmas";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        // Return hasil data
        return {
            code: 200,
            message: 'Staff Puskesmas fetched successfully!',
            data: staff_puskesmas,
            totalPages,
            prev: prevPage,
            next: nextPage,
        };
    } catch (error: any) {
        console.error('Error fetching Staff Puskesmas:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
