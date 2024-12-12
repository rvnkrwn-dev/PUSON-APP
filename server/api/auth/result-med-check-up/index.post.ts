import { ResultMedCheckUp } from '~/server/model/ResultMedCheckUp';
import { prisma } from '~/server/config/db';

export default defineEventHandler(async (event) => {
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
            return { status: 400, message: 'Please provide medCheckUpIds or updatedAfter' };
        }

        const resultMedCheckUps = await Promise.all(medCheckUps.map(async medCheckUp => {
            return ResultMedCheckUp.createResultMedCheckUp(medCheckUp.id);
        }));

        return { status: 201, data: resultMedCheckUps };
    } catch (error: any) {
        return { status: 500, message: error.message };
    }
});
