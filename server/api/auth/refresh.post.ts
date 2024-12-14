import { RefreshToken } from '~/server/model/RefreshToken';
import { decodeRefreshToken, generateAccessToken } from '~/server/utils/jwt';
import {User} from "~/server/model/User";

export default defineEventHandler(async (event) => {
    try {
        // Retrieve refresh token from cookie using getCookie
        const refreshToken = getCookie(event, 'refresh_token'); // Ensure the cookie name matches

        if (!refreshToken) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Tidak ada refresh token yang ditemukan dalam cookie.' };
        }

        // Check if the refresh token exists in the database
        const storedToken = await RefreshToken.findToken(refreshToken);
        if (!storedToken) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Refresh token tidak valid' };
        }

        // Verify the refresh token
        let decoded: any;
        try {
            decoded = decodeRefreshToken(refreshToken);
        } catch (error) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Refresh token tidak valid' };
        }

        // Check if the users exists
        const user = await User.getUserById(decoded.id);
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid dengan refresh token.' };
        }

        // Generate new access token
        const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        // Return new access token in response
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
