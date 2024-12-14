import { ResultMedCheckUp } from '~/server/model/ResultMedCheckUp';
import { prisma } from '~/server/config/db';
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    // Check if user exists
    const user = event.context.auth.user;

    if (!user) {
        setResponseStatus(event, 403);
        return { code: 403, message: 'Pengguna tidak valid' };
    }

    try {
        const body = await readBody(event);
        const { medCheckUpIds, updatedAfter } = body;

        let medCheckUps = [];

        if (medCheckUpIds && medCheckUpIds.length > 0) {
            medCheckUps = await prisma.medCheckUp.findMany({
                where: {
                    id: { in: medCheckUpIds },
                },
                include: {
                    child: true,
                    user: {
                        select: {
                            id: true,
                            full_name: true,
                            email: true,
                            role: true,
                            status: true,
                        }
                    }
                }
            });
        } else if (updatedAfter) {
            medCheckUps = await prisma.medCheckUp.findMany({
                where: {
                    updated_at: {
                        gte: new Date(updatedAfter),
                    },
                },
                include: {
                    child: true,
                    user: {
                        select: {
                            id: true,
                            full_name: true,
                            email: true,
                            role: true,
                            status: true,
                        }
                    }
                }
            });
        } else {
            return { status: 400, message: 'Harap berikan medCheckUpIds atau updatedAfter' };
        }


        const resultMedCheckUps = await Promise.all(medCheckUps.map(async medCheckUp => {
            return ResultMedCheckUp.createResultMedCheckUp(medCheckUp.id);
        }));

        const data = await readBody(event);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.Hapus,
            device : data.device,
            ip_address : data.ip_address,
            location : data.location,
            description : `Data hasil pemeriksaan dengan ID ${medCheckUps}, berhasil ditambahkan`,
        }

        await createLog(payload)

        return { status: 201, data: resultMedCheckUps };
    } catch (error: any) {
        return { status: 500, message: error.message };
    }
});
