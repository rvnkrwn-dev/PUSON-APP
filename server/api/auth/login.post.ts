import bcrypt from 'bcryptjs';
import { RefreshToken } from '~/server/model/RefreshToken';
import { User } from '~/server/model/User';
import { createLog } from '~/server/utils/atLog';
import { generateToken, sendRefreshToken } from '~/server/utils/jwt';
import { defineEventHandler, readBody, setResponseStatus, sendError } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        const data = await readBody(event);

        // Validate input
        if (!data.email || !data.password || !data.ip_address) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Please provide email and password.' };
        }

        // Check if user exists
        const user = await User.getUserByEmail(data.email);

        if (!user) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Invalid credentials.' };
        }

        // Check password
        const isPasswordValid = bcrypt.compareSync(data.password, user.password);
        if (!isPasswordValid) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Invalid credentials.' };
        }

        // Generate tokens
        const { refreshToken, accessToken } = generateToken(user);
        const { password, ...userData } = user;

        // Store refresh token in the database
        await RefreshToken.create(user.id, refreshToken);

        // Set refresh token in cookie
        sendRefreshToken(event, refreshToken);

        await createLog(user.id, 'Login', `User logged in from IP ${data.ip_address}`);

        // Return access token in response
        return {
            code: 200,
            message: 'Login successful!',
            access_token: accessToken,
            data: {
                user: userData,
            },
        };
    } catch (error: any) {
        console.error('Login error:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' }),
        );
    }
});
