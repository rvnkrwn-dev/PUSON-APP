import {User} from "~/server/model/User";

export default defineEventHandler(async (event) => {
    try {
        // Check if user exists
        const user = event.context.auth?.user;
        console.log(user)

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Invalid user' };
        }

        const query = getQuery(event);
        const id = query.id ? Number(query.id) : null;

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Invalid user ID.' };
        }

        const data = await readBody(event);
        delete data.password;

        // Update the user
        const updatedUser = await User.updateUser(id, data);

        await createLog(user.id, 'Perbarui User', 'Berhasil memperbarui pengguna baru');

        // Exclude password from the response
        const { password, ...userData } = updatedUser;

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
        // Log and return error if any
        console.error('Error updating user:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
