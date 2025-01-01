import { Child } from '~/server/model/Child';
import { setResponseStatus, createError, sendError } from 'h3';
import { createLog } from "~/server/utils/atLog";
import { ActionLog } from "~/types/TypesModel";
import { LogRequest } from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        // Check if the user exists
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const data = await readBody(event);

        // Ensure 'user_id' and 'posyandu_id' are valid
        const newData = {
            ...data,
            user_id: user.id, // Use 'user_id' instead of 'userId'
        };

        // Make sure 'nik.user_id' is properly set
        newData.nik.user_id = user.id;

        // Check if 'posyandu_id' is present
        if (!newData.posyandu_id) {
            throw createError({
                statusCode: 400,
                message: "posyandu_id dibutuhkan."
            });
        }

        // Create the Child record
        const child = await Child.createChild(newData);

        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.Tambah,
            device: data.device,
            ip_address: data.ip_address,
            location: data.location,
            description: `Data anak dengan ID ${child.id}, berhasil ditambah`,
        };

        await createLog(payload);

        // Return the created child
        return {
            code: 201,
            message: 'Data anak berhasil dibuat!',
            data: {
                child
            },
        };
    } catch (error: any) {
        if (error.code === "P2025") {
            return { code: 404, message: 'Data tidak ditemukan' };
        }
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
