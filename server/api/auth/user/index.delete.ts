import {defineEventHandler, sendError, createError, getQuery, setResponseStatus} from 'h3';
import { User } from '~/server/model/User';
import {createLog} from "~/server/utils/atLog";
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
        const query = getQuery(event);
        const id = query.id ? Number(query.id) : null;

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid user ID." };
        }

        // Delete the user
        await User.deleteUser(id);

        await createLog(id, "Hapus User", `Berhasil mengahapus pengguna`)

        // Set response status and return success response
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "User deleted successfully!",
        };
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
