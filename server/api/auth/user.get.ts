import { User } from '~/server/model/User';
import { createLog } from "~/server/utils/atLog";

export default defineEventHandler(async (event) => {
    try {
        // Mengambil ID pengguna dari konteks otentikasi
        const id = parseInt(event.context.auth?.user?.id as string);

        // Validasi ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Pengguna tidak valid' };
        }

        // Mengambil data pengguna berdasarkan ID
        const user = await User.getUserById(id);

        // Mengatur status respons dan mengembalikan respons sukses
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Berhasil mengembalikan data pengguna",
            data: {
                user: user
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
