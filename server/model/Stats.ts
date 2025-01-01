import { prisma } from '~/server/config/db';

export class Stats {
    static countUsers = async () => {
        return prisma.user.count();
    };

    static countAllChildren = async () => {
        return prisma.child.count();
    };

    static countAllPuskesmas = async () => {
        return prisma.puskesmas.count();
    };

    static countAllPosyandu = async () => {
        return prisma.posyandu.count();
    };

    static countAllYear = async () => {
        const result = await prisma.resultMedCheckUp.groupBy({
            by: ['created_at'],
            _count: {
                id: true,
            },
            orderBy: {
                created_at: 'asc',
            },
        });

        const years = result.map(entry => entry.created_at.getFullYear());

        return years;
    };
}
