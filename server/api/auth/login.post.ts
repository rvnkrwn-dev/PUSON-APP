import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '~/server/model/RefreshToken';
import {User} from "~/server/model/User";


const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN!;

const generateAccessToken = (user: any) => {
    return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};

const generateRefreshToken = async (user: any) => {
    const token = jwt.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    await RefreshToken.create(user.id, token);
    return token;
};

export default defineEventHandler(async (event) => {
    try {
        const data = await readBody(event);

        // Validasi input
        if (!data.email || !data.password) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Please provide email and password.' };
        }

        // Periksa apakah user ada
        const user = await User.getUserByEmail(data.email)

        if (!user) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Invalid credentials.' };
        }

        console.log(`User found: ${user.full_name}`);

        // Periksa password
        const isPasswordValid = bcrypt.compareSync(data.password, user.password);
        if (!isPasswordValid) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Invalid credentials.' };
        }


        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);
        const {password, ...userData} = user

        // Set refresh token in cookie
        appendHeader(event, 'Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`);

        // Return access token in response
        return {
            code: 200,
            message: 'Login successful!',
            accessToken,
            data: {
                user:userData
            }
        };
    } catch (error: any) {
        console.error('Login error:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
