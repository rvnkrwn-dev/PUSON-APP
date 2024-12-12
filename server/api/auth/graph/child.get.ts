import {Dashboard} from "~/server/model/Dashboard";

export default defineEventHandler(async (event) => {
    try {
        // Gunakan model untuk mendapatkan data dashboard anak
        const data = await Dashboard.getChildDashboard();

        // Set response status dan kembalikan data
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Data retrieved successfully.",
            data: data,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
