import { Puskesmas } from "~/server/model/Puskesmas";

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
                message: "Halaman dan ukuran halaman harus berupa bilangan bulat positif.",
            });
        }

        // Fetch Puskesmas from the database
        const puskesmas = await Puskesmas.getAllPuskesmas(page, pagesize);

        // Hitung total halaman (ini hanya contoh, sesuaikan dengan kebutuhan Anda)
        const totalUsers = await Puskesmas.countAllPuskesmas();
        const totalPages = Math.ceil(totalUsers / pagesize);

        // Buat URL untuk prev dan next
        const baseUrl = "/api/auth/puskesmas";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;



        if (!puskesmas) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Puskesmas tidak ditemukan' };
        }

        // Return the fetched Puskesmas
        return {
            code: 200,
            message: 'Data puskesmas berhasil dikembalikan!',
            data: {
                puskesmas
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
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
