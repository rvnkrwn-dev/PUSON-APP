import { RefreshToken } from '~/server/model/RefreshToken';
import { prisma } from '~/server/config/db';
import { decodeRefreshToken, generateAccessToken } from '~/server/utils/jwt';
import { defineEventHandler, setResponseStatus, sendError, getCookie } from 'h3';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    try {
        // Retrieve refresh token from cookie using getCookie
        const refreshToken = getCookie(event, 'refresh_token'); // Ensure the cookie name matches
        console.log('Received Refresh Token:', refreshToken);

        if (!refreshToken) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'No refresh token found in cookies.' };
        }

        // Check if the refresh token exists in the database
        const storedToken = await RefreshToken.findToken(refreshToken);
        console.log('Stored Token:', storedToken);
        if (!storedToken) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid refresh token.' };
        }

        // Verify the refresh token
        let decoded: any;
        try {
            decoded = decodeRefreshToken(refreshToken);
            console.log('Decoded Token:', decoded);
        } catch (error) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid refresh token.' };
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });
        console.log('User:', user);
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
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' }),
        );
    }
});
