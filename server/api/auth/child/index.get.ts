import { Child } from "~/server/model/Child";

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
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

        // Panggil fungsi `getAllChildren` dari Child model
        const children = await Child.getAllChildren(page, pagesize);

        // Hitung total halaman (ini hanya contoh, sesuaikan dengan kebutuhan Anda)
        const totalChildren = await Child.countAllChildren();
        const totalPages = Math.ceil(totalChildren / pagesize);

        // Buat URL untuk prev dan next
        const baseUrl = "/api/auth/child";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        // Return hasil data
        return {
            message: "Data anak berhasil dikembalikan!",
            data: children,
            totalPages,
            prev: prevPage,
            next: nextPage,
        };
    } catch (error: any) {
        if (error.code === "P2025") {
            return { code: 404, message: 'Data tidak ditemukan' };
        }
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error?.message || 'Internal Server Error' })
        );
    }
});