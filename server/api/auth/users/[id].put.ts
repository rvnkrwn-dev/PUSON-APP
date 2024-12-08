import {User} from "~/server/model/User";
import {UpdateUserType} from "~/types/UserType";

export default defineEventHandler(async (event) => {
    try {
        // Check if users auth
        const user = event.context.auth?.user;

        const id = parseInt(event.context.params?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Invalid users ID.'};
        }

        const data: UpdateUserType = await readBody(event);

        // Update the users
        const updatedUser = await User.updateUser(id, data);

        await createLog(user.id, 'Perbarui User', 'Berhasil memperbarui pengguna baru');

        // Exclude password from the response
        const {password, ...userData} = updatedUser;

        // Set response status and return success response
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: 'User updated successfully!',
            data: {
                user: userData,
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({statusCode: 500, statusMessage: error?.message || 'Internal Server Error'})
        );
    }
});
