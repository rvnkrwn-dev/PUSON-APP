import { RefreshToken } from '~/server/model/RefreshToken';
import { addToBlacklist } from '~/server/utils/tokenBlacklist';
import { deleteRefreshToken, verifyToken } from '~/server/utils/jwt';
import { createLog } from '~/server/utils/atLog';
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        // Memeriksa apakah pengguna ada
        const user = event.context.auth.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        // Memeriksa header otorisasi
        const authHeader = event.req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            setResponseStatus(event, 401);
            return { error: 'Tidak terotorisasi' };
        }

        // Memverifikasi token
        const token = authHeader.split(' ')[1];
        verifyToken(token);

        // Menambahkan token akses ke dalam daftar hitam
        addToBlacklist(token);

        // Mengambil refresh token dari cookie menggunakan getCookie
        const refreshToken = getCookie(event, 'refresh_token'); // Pastikan nama cookie cocok

        if (!refreshToken) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Tidak ada refresh token yang ditemukan dalam cookie.' };
        }

        // Menghapus refresh token dari basis data
        await RefreshToken.deleteToken(refreshToken);

        const data = await readBody(event);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Keluar,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Pengguna dengan ID ${user.id}, berhasil keluar`,
        }

        await createLog(payload);

        // Menghapus refresh token dari cookie
        deleteRefreshToken(event);

        // Menambahkan header Set-Cookie untuk menghapus refresh token
        appendHeader(event, 'Set-Cookie', 'refresh_token=; HttpOnly; Path=/; Max-Age=0');

        // Mengembalikan respons sukses
        return { code: 200, message: 'Berhasil keluar!' };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
        );
    }
});
