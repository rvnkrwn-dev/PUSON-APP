import { Posyandu } from '~/server/model/Posyandu';

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            event.res.statusCode = 403;
            return { code: 403, message: 'Invalid user' };
        }

        const id = parseInt(event.context.params?.id as string, 10);
        const data = await readBody(event);

        const updatedPosyandu = await Posyandu.updatePosyandu(id, data);

        return {
            code: 200,
            message: 'Posyandu updated successfully!',
            data: updatedPosyandu,
        };
    } catch (error: any) {
        console.error('Error updating Posyandu:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
