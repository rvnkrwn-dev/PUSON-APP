import { User } from '~/server/model/User';
import {createLog} from "~/server/utils/atLog";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.auth?.user?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Invalid users ID.'};
        }

        // get the user
        const user = await User.getUserById(id);

        // Set response status and return success response
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "User retrieved successfully.",
            data: {
                user: user
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
