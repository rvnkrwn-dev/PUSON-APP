import { RefreshToken } from '~/server/model/RefreshToken';
import { decodeRefreshToken, generateAccessToken } from '~/server/utils/jwt';
import { User } from "~/server/model/User";

export default defineEventHandler(async (event) => {
    try {
        // Mengambil refresh token dari cookie menggunakan getCookie
        const refreshToken = getCookie(event, 'refresh_token');

        if (!refreshToken) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Tidak ada refresh token yang ditemukan dalam cookie.' };
        }

        // Memeriksa apakah refresh token ada di database
        const storedToken = await RefreshToken.findToken(refreshToken);
        if (!storedToken) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Refresh token tidak valid' };
        }

        // Memverifikasi refresh token
        let decoded: any;
        try {
            decoded = decodeRefreshToken(refreshToken);
        } catch (error) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Refresh token tidak valid' };
        }

        // Memeriksa apakah pengguna ada
        const user = await User.getUserById(decoded.id);
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid dengan refresh token.' };
        }

        // Menghasilkan token akses baru
        const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        // Mengembalikan token akses baru dalam respons
        return {
            code: 200,
            message: 'Token akses baru berhasil dibuat!',
            access_token: accessToken,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' }),
        );
    }
});
