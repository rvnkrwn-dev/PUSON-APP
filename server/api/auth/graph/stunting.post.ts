import {Dashboard} from "~/server/model/Dashboard";

export default defineEventHandler(async (event) => {
    try {
        // Ambil parameter tahun dari body permintaan
        const body = await readBody(event);
        const year = parseInt(body.year, 10) || new Date().getFullYear();

        // Gunakan model untuk mendapatkan data dashboard stunting berdasarkan tahun
        const data = await Dashboard.getStuntingDashboard(year);

        // Set response status dan kembalikan data
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Data retrieved successfully.",
            data: data,
        };
    } catch (error) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});




