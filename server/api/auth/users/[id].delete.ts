import { User } from '~/server/model/User';
import {createLog} from "~/server/utils/atLog";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;

        const id = parseInt(event.context.params?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Invalid users ID.'};
        }

        // Delete the users
        await User.deleteUser(id);

        await createLog(user.id, "Hapus User", `Berhasil mengahapus pengguna`)

        // Set response status and return success response
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "User deleted successfully!",
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
