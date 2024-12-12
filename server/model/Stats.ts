import { prisma } from '~/server/config/db';

export class Stats {
    static countUsers = () => {
        return prisma.user.count();
    };

    static countAllChildren = () => {
        return prisma.child.count();
    };

    static countAllPuskesmas = () => {
        return prisma.puskesmas.count();
    };

    static countAllPosyandu = () => {
        return prisma.posyandu.count();
    };
}
