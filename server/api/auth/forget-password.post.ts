import jwt from 'jsonwebtoken';
import { prisma } from '~/server/config/db';
import { RefreshToken } from '~/server/model/RefreshToken';
import { SendEmailResetPassword } from '~/server/utils/SendEmailResetPassword';

const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN!;

export default defineEventHandler(async (event) => {
    try {
        const { email, base_url } = await readBody(event);

        // Validasi email
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            setResponseStatus(event, 200);
            return { code: 400, message: 'A password reset link has been sent to your email if registered.' };
        }

        // Buat token reset dengan waktu berlaku 15 menit
        const resetToken = jwt.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, { expiresIn: '15m' });
        await RefreshToken.create(user.id, resetToken);

        // Buat URL reset kata sandi
        const resetUrl = `${base_url}/auth/reset-password?token=${resetToken}`;

        // Buat konten email dalam format HTML
        const emailHtml = `
            <h1>Reset Password</h1>
            <p>Click the link below to reset your password:</p>
            <a href="${resetUrl}">Reset Password</a>
        `;

        // Kirim email dengan URL reset kata sandi
        await SendEmailResetPassword(email, 'Reset Password', `Click the link to reset your password: ${resetUrl}`, emailHtml);

        // Mengembalikan respons sukses
        return { code: 200, message: 'A password reset link has been sent to your email if registered.' };

    } catch (error: any) {
        console.error('Forget password error:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
