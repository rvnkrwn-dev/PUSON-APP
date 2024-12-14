import { MedCheckUp } from '~/server/model/MedCheckUp';

export default defineEventHandler(async (event) => {
    try {
        // Periksa apakah pengguna ada
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        // Ambil parameter `page` dan `pagesize` dari query string
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pagesize = parseInt(query.pagesize as string, 10) || 10;

        // Validasi input
        if (page <= 0 || pagesize <= 0) {
            throw createError({
                statusCode: 400,
                message: "Halaman dan ukuran halaman harus berupa bilangan bulat positif.",
            });
        }

        // Ambil data KK
        const kk = await MedCheckUp.getAllMedCheckUps(page, pagesize);

        // Hitung total halaman
        const totalUsers = await MedCheckUp.countAllMedCheckUp();
        const totalPages = Math.ceil(totalUsers / pagesize);

        // Buat URL untuk prev dan next
        const baseUrl = "/api/auth/med-check-up";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        // Return hasil data
        return {
            code: 200,
            message: 'Data pemeriksaan berhasil dikembalikan!',
            data: kk,
            totalPages,
            prev: prevPage,
            next: nextPage,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
