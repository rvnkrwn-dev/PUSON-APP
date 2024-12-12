import { Stats } from '~/server/model/Stats';

export default defineEventHandler(async (event) => {
    try {
        // Ambil data statistik dari model
        const [puskesmas, posyandu, anak, pengguna] = await Promise.all([
            Stats.countAllPuskesmas(),
            Stats.countAllPosyandu(),
            Stats.countAllChildren(),
            Stats.countUsers(),
        ]);

        // Set response status dan kembalikan data statistik
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Statistics retrieved successfully.",
            data: {
                puskesmas,
                posyandu,
                anak,
                pengguna
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
