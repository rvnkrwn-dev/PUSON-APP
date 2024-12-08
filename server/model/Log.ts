import { prisma } from '~/server/config/db';
import { LogType } from '~/types/LogType';

export class Log {
    static createLog = (data: any): Promise<LogType> => {
        return prisma.log.create({
            data: {
                user_id: data.user_id,
                action: data.action,
                description: data.description,
            },
        }) as unknown as Promise<LogType>;
    };

    static getAllLogByUserId = async (user_id: number, page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const [total, logs] = await Promise.all([
            prisma.log.count({ where: { user_id } }), // Get total count of logs for the user
            prisma.log.findMany({
                where: { user_id },
                skip: skip,
                take: take,
                include: {
                    user_id: true,
                    action: true,
                    description: true,
                    user: true // Include related user data if needed
                }
            })
        ]);
    };

    static getAllLogs = async (page: number, pageSize: number): Promise<{ data: LogType[], total: number, page: number }> => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const [total, logs] = await Promise.all([
            prisma.log.count(), // Get total count of logs
            prisma.log.findMany({
                skip: skip,
                take: take,
                include: {
                    user_id: true,
                    action: true,
                    description: true,
                    user: true // Include related user data if needed
                }
            })
        ]);
    };
}
