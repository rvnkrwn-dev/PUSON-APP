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

        const {password, ...data} = await readBody(event);

        // Update the user
        const user = await User.updateUser(id, data);

        await createLog(user.id, "Perbarui User", `Berhasil memperbarui pengguna baru`)

        // Set response status and return success response
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "User updated successfully!",
            data: {
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role,
                }
            },
        };
    } catch (error: any) {
        // Return error if any
        console.error('Error updating user:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
