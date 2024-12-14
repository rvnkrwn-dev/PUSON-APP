import { Dashboard } from "~/server/model/Dashboard";

export default defineEventHandler(async (event) => {
    try {
        // Ambil parameter tahun dari query permintaan
        const { year } = getQuery(event);
        const currentYear = new Date().getFullYear();
        const yearString = Array.isArray(year) ? year[0] : year;  // Pastikan year adalah string
        const yearInt = yearString ? parseInt(yearString, 10) : currentYear;

        // Gunakan model untuk mendapatkan data dashboard stunting berdasarkan tahun
        const data = await Dashboard.getStuntingDashboard(yearInt);

        // Set response status dan kembalikan data
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Data berhasil dikembalikan.",
            data: data,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
