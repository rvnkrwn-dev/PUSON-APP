import { Puskesmas } from '~/server/model/Puskesmas';
import { PuskesmasRequest } from '~/types/AuthType';

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context?.auth?.user;

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        const data: PuskesmasRequest = await readBody(event);

        // Check if Puskesmas with the same name already exists
        const existingPuskesmas = await Puskesmas.getPuskesmasByName(data.name);
        if (existingPuskesmas) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Puskesmas with the same name already exists.' };
        }

        // Assign user ID from the token
        const newData = {
            ...data,
            user_id: user.id
        };

        // Create Puskesmas in the database
        const puskesmas = await Puskesmas.createPuskesmas(newData);

        // Return the newly created Puskesmas
        return {
            code: 201,
            message: 'Puskesmas created successfully!',
            data: {
                puskesmas
            },
        };
    } catch (error: any) {
        console.error('Error creating Puskesmas:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
