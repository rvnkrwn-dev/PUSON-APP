import { DetailUser } from '~/server/model/DetailUser';
import {DetailUserRequest} from "~/types/AuthType";

export default defineEventHandler(async (event) => {


    try {
        // Check if user exists
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        // Read the request body
        const data: DetailUserRequest = await readBody(event);

        // Assign users ID from the token
        const newData = {
            ...data,
            user_id: user.id
        };


        const detailUser = await DetailUser.createDetailUser(newData);

        return {
            code: 201,
            message: 'Detail user created successfully!',
            data: detailUser,
        };
    } catch (error: any) {
        console.error('Error creating detail user:', error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
