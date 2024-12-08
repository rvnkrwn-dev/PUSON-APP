import {Puskesmas} from "~/server/model/Puskesmas";

export default defineEventHandler(async (event) => {
    try {
        // Ambil parameter `page` dan `pagesize` dari query string
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pagesize = parseInt(query.pagesize as string, 10) || 10;

        // Validasi input
        if (page <= 0 || pagesize <= 0) {
            throw createError({
                statusCode: 400,
                message: "Page and pagesize must be positive integers.",
            });
        }
        // Fetch Puskesmas from the database
        const puskesmas = await Puskesmas.getAllPuskesmas(page, pagesize);

        if (!puskesmas) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Puskesmas not found' };
        }


        // Return the fetched Puskesmas
        return {
            code: 200,
            message: 'Puskesmas fetched successfully!',
            data:{
                puskesmas,

            },
        };
    } catch (error: any) {
        console.error('Error fetching Puskesmas:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
