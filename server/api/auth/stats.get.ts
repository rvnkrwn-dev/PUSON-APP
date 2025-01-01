import { Stats } from '~/server/model/Stats';

export default defineEventHandler(async (event) => {
    try {
        // Ambil data statistik dari model
        const [puskesmas, posyandu, anak, pengguna, tahun] = await Promise.all([
            Stats.countAllPuskesmas(),
            Stats.countAllPosyandu(),
            Stats.countAllChildren(),
            Stats.countUsers(),
            Stats.countAllYear()
        ]);

        // Set response status dan kembalikan data statistik
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Berhasil mengembalikan data stats",
            data: {
                puskesmas,
                posyandu,
                anak,
                pengguna,
                tahun : [...new Set(tahun)],
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
