import { Puskesmas } from '~/server/model/Puskesmas';
import {LogRequest, PuskesmasRequest} from '~/types/AuthType';
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        // Check if users exists
        const user = event.context?.auth?.user;

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const data: PuskesmasRequest = await readBody(event);

        // Check if Puskesmas with the same name already exists
        const existingPuskesmas = await Puskesmas.getPuskesmasByName(data.name);
        if (existingPuskesmas) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Puskesmas dengan nama yang saya sudah terdaftar.' };
        }

        // Assign users ID from the token
        const newData = {
            ...data,
            user_id: user.id
        };

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Tambah,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data puskesmas dengan ID ${user.id}, berhasil ditamabahkan`,
        }

        await createLog(payload)

        // Create Puskesmas in the database
        const puskesmas = await Puskesmas.createPuskesmas(newData);

        // Return the newly created Puskesmas
        return {
            code: 201,
            message: 'Data puskesmas berhasil ditambahkan!',
            data: {
                puskesmas
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
