import { prisma } from '~/server/config/db';
import { LogRequest } from '~/types/AuthType';

export class Log {
    static createLog = async (data: LogRequest) => {
        return prisma.log.create({
            data: {
                user_id: data.user_id,
                action: data.action,
                device: data.device,
                ip_address: data.ip_address,
                location: data.location,
                description: data.description,
            },
        });
    };

    static updateLog = async (id: number, data: LogRequest) => {
        // Check if the record exists
        const existingRecord = await prisma.log.findUnique({ where: { id } });

        if (!existingRecord) {
            throw new Error('Record to update not found.');
        }

        return prisma.log.update({
            where: { id },
            data: {
                user_id: data.user_id,
                action: data.action,
                device: data.device,
                ip_address: data.ip_address,
                location: data.location,
                description: data.description,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        role: true,
                    }
                }
            }
        });
    };

    static deleteLog = (id: number) => {
        return prisma.log.delete({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        role: true,
                    }
                }
            }
        });
    };

    static getLogById = (id: number) => {
        return prisma.log.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        role: true,
                    }
                }
            }
        });
    };

    static getAllLogs = (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        return prisma.log.findMany({
            skip: skip,
            take: take,
            include: {
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        role: true,
                    }
                }
            }
        });
    };

    static getAllLogsByUserId = (user_id: number, page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return Promise.all([
            prisma.log.count({
                where: { user_id }
            }), // Get total count of logs for the user
            prisma.log.findMany({
                where: { user_id },
                skip: skip,
                take: take,
                include: {
                    user: {
                        select: {
                            id: true,
                            full_name: true,
                            email: true,
                            role: true,
                        }
                    }
                }
            })
        ]);
    };

    static countAllLog = () => {
        return prisma.log.count();
    };
}
