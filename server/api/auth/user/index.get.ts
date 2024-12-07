import { User } from '~/server/model/User';
import {setResponseStatus} from "h3";
import {verifyToken} from "~/server/utils/jwt";


export default defineEventHandler(async (event) => {
    const authHeader = event.req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        setResponseStatus(event, 401);
        return { error: 'Unauthorized' };
    }

    const token = authHeader.split(' ')[1];

    try {
        verifyToken(token)

        const authHeader = event.req.headers['authorization'];
        // Panggil fungsi untuk mengambil semua pengguna
        const users = await User.getAllUsers();

        // Mengembalikan respons sukses
        return { users };
    } catch (error: any) {
        console.error('Error fetching users:', error);
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        }));
    }
});
