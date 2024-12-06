import { RefreshToken } from '~/server/model/RefreshToken';
import { addToBlacklist } from '~/server/utils/tokenBlacklist';

export default defineEventHandler(async (event) => {

    try {
        // Ambil access token dari header Authorization
        const authHeader = event.node.req.headers.authorization;

        if (!authHeader) {
            setResponseStatus(event, 401);
            return { code: 401, message: 'Authorization header is missing.' };
        }

        const accessToken = authHeader.split(' ')[1];

        // Tambahkan access token ke dalam blacklist
        addToBlacklist(accessToken);

        // Ambil refresh token dari cookie
        const refreshToken = event.node.req.headers.cookie?.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1];

        if (!refreshToken) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'No refresh token found in cookies.' };
        }

        // Hapus refresh token dari database
        await RefreshToken.deleteToken(refreshToken);

        // Hapus refresh token dari cookie
        appendHeader(event, 'Set-Cookie', 'refreshToken=; HttpOnly; Path=/; Max-Age=0');

        // Mengembalikan respons sukses
        return { code: 200, message: 'Logout successful!' };
    } catch (error: any) {
        console.error('Logout error:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
