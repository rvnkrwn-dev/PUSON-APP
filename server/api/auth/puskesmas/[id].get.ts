import {Puskesmas} from "~/server/model/Puskesmas";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'ID tidak valid.'};
        }


        // get the user
        const puskesmas = await Puskesmas.getPuskesmasById(id);

        // Set response status and return success response
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Data puskesmas berhasil dikembalikan.",
            data: {
                puskesmas: puskesmas
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({statusCode: 500, statusMessage: error.message || "Internal Server Error"})
        );
    }
});
