import { Posyandu } from '~/server/model/Posyandu';

export default defineEventHandler(async (event) => {
    try {
        // Ambil parameter pencarian dari query string
        const { q } = getQuery(event);

        // Validasi parameter pencarian
        if (typeof q !== 'string' || !q) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Parameter pencarian diperlukan dan harus berupa string.' };
        }

        // Cari pengguna berdasarkan nama lengkap atau email
        const posyandu = await Posyandu.searchPosyandu(q);

        // Set response status dan kembalikan hasil pencarian
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Data posyandu berhasil dikembalikan.",
            data: {
                posyandu: posyandu
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
