import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '~/server/config/db';
import { RefreshToken } from '~/server/model/RefreshToken';

const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN!;

export default defineEventHandler(async (event) => {
    try {
        const { newPassword, confirmNewPassword } = await readBody(event);
        const token = event.node.req.url?.split('token=')[1];
        console.log('Token:', token);

        if (!token || !newPassword || !confirmNewPassword) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'All fields are required.' };
        }

        if (newPassword !== confirmNewPassword) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Passwords do not match.' };
        }

        // Periksa apakah token ada di database
        const tokenInDb = await RefreshToken.findToken(token);
        if (!tokenInDb) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid or expired token.' };
        }

        // Verifikasi token reset
        let decoded: any;
        try {
            decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
        } catch (error) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid or expired token.' };
        }

        // Periksa apakah users ada
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid users associated with token.' };
        }

        // Check if the new password is different from the old password
        const isPasswordSame = bcrypt.compareSync(newPassword, user.password);
        if (isPasswordSame) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'New password cannot be the same as the old password.' };
        }

        // Hash new password
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Update users password
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword }
        });

        // Hapus refresh token dari database setelah perubahan password berhasil
        await RefreshToken.deleteToken(token);

        // Return success response
        return { code: 200, message: 'Password has been reset successfully.' };

    } catch (error: any) {
        console.error('Reset password error:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
