import { prisma } from '~/server/config/db';

export class Log {
    static createLog = (user_id: number, action: string, description: string) => {
        return prisma.log.create({
            data: {
                user_id: user_id,
                action: action,
                description: description,
            },
        });
    };

    static getAllLogByUserId = (user_id: number) => {
        return prisma.log.findMany({
            where: {
                user_id: user_id,
            }
        });
    };
}
