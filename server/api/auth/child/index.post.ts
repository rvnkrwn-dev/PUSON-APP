import { Child } from '~/server/model/Child';
import { setResponseStatus, createError, sendError } from 'h3';
import {createLog} from "~/server/utils/atLog";
import {ActionLog} from "~/types/TypesModel";
import {LogRequest} from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        // Periksa apakah pengguna ada
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const data = await readBody(event);

        // Assign user's ID from the token
        const newData = {
            ...data,
            userId: user.id // Gunakan user_id di sini
        };

        // Periksa apakah `posyandu_id` tersedia
        if (!newData.posyanduId) {
            throw createError({
                statusCode: 400,
                message: "posyandu_id dibutuhkan."
            });
        }

        // Create Child in the database
        const child = await Child.createChild(newData);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Tambah,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data anak dengan ID ${child.id}, berhasil ditambah`,
        }

        await createLog(payload)

        // Return the newly created Child
        return {
            code: 201,
            message: 'Data anak berhasil dibuat!',
            data: {
                child
            },
        };
    } catch (error: any) {
        if (error.code === "P2025"){
            return { code: 404, message: 'Data tidak ditemukan' };
        }
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' })
        );
    }
});
