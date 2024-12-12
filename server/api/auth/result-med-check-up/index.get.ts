import {ResultMedCheckUp} from "~/server/model/ResultMedCheckUp";
import {NIKChild} from "~/server/model/NIKChild";

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

        const resultMedCheckUps = await ResultMedCheckUp.getAllResultMedCheckUp(page, pagesize);

        // Hitung total halaman
        const totalNIKs = await ResultMedCheckUp.countAllResultMedCheckUp();
        const totalPages = Math.ceil(totalNIKs / pagesize);

        // Buat URL untuk prev dan next
        const baseUrl = "/api/auth/result-med-check-up";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        // Return hasil data
        return {
            code: 200,
            message: 'ResultMedCheckUp fetched successfully!',
            data: resultMedCheckUps,
            totalPages,
            prev: prevPage,
            next: nextPage,
        };
    } catch (error: any) {
        return { status: 500, message: error.message };
    }
});
