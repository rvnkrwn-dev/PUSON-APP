import jwt from 'jsonwebtoken';
import { RefreshToken } from '~/server/model/RefreshToken';
import { prisma } from '~/server/config/db';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN!;

const generateAccessToken = (user: any) => {
    return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};

export default defineEventHandler(async (event) => {
    try {
        // Ambil refresh token dari cookie
        const refreshToken = event.node.req.headers.cookie?.split('; ').find(row => row.startsWith('refreshToken='))?.split('=')[1];

        if (!refreshToken) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'No refresh token found in cookies.' };
        }

        // Periksa apakah refresh token ada di database
        const storedToken = await RefreshToken.findToken(refreshToken);
        if (!storedToken) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid refresh token.' };
        }

        // Verifikasi refresh token
        let decoded: any;
        try {
            decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        } catch (error) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid refresh token.' };
        }

        // Periksa apakah user ada
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user associated with refresh token.' };
        }

        // Generate new access token
        const accessToken = generateAccessToken(user);

        // Return new access token in response
        return {
            code: 200,
            message: 'New access token generated successfully!',
            accessToken,
        };
    } catch (error: any) {
        console.error('Refresh token error:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
