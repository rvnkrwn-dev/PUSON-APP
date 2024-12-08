import { User } from '~/server/model/User';
import {createLog} from "~/server/utils/atLog";

export default defineEventHandler(async (event) => {

    try {
        const query = getQuery(event);
        const id = query.id ? Number(query.id) : null;

        // Validate ID
        if (!query.id || id == null) {
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
