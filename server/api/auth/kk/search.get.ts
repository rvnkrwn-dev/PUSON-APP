import { KK } from '~/server/model/KK';

export default defineEventHandler(async (event) => {
    try {
        // Ambil parameter pencarian dari query string
        const { q } = getQuery(event);

        // Validasi parameter pencarian
        if (typeof q !== 'string' || !q) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Halaman dan ukuran halaman harus berupa bilangan bulat positif.' };
        }

        // Cari pengguna berdasarkan nama lengkap atau email
        const kk = await KK.searchKK(q);

        // Set response status dan kembalikan hasil pencarian
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "KK berhasil dikembalikan.",
            data: {
                kk: kk
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
