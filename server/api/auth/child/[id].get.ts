import {Child} from "~/server/model/Child";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Invalid Child ID.'};
        }

        // get the user
        const child = await Child.getChildById(id);

        // Set response status and return success response
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Childs retrieved successfully.",
            data: {
                child
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({statusCode: 500, statusMessage: error.message || "Internal Server Error"})
        );
    }
});
