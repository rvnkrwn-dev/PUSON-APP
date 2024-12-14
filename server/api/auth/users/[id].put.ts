import {User} from "~/server/model/User";
import {UpdateUserType} from "~/types/UserType";
import {ActionLog, UpdateUserRequest} from "~/types/TypesModel";
import {LogRequest} from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        // Check if users auth
        const user = event.context.auth?.user;

        const id = parseInt(event.context.params?.id as string);

        // Validate ID
        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Pengguna tidak valid'};
        }

        const data = await readBody(event);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Perbarui,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Akun dengan dengan ID ${id}, berhasil diperbarui`,
        }

        await createLog(payload)

        // Update the users
        const updatedUser = await User.updateUser(id, data);

        // await createLog(user.id, 'Perbarui User', 'Berhasil memperbarui pengguna baru');

        // Exclude password from the response
        const {password, ...userData} = updatedUser;

        // Set response status and return success response
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: 'Akun pengguna berhasil diperbarui!',
            data: {
                user: userData,
            },
        };
    } catch (error: any) {
        console.error(error);
        return sendError(
            event,
            createError({statusCode: 500, statusMessage: error?.message || 'Internal Server Error'})
        );
    }
});
