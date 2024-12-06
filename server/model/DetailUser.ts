import { prisma } from '~/server/config/db';
import { RegisterRequest } from '~/types/AuthType';

export class DetailUser {
    static createDetailUser(data: RegisterRequest) {
        // Pastikan bod adalah objek Date yang valid
        const bod = (typeof data.bod === 'string') ? new Date(data.bod) : data.bod;

        return prisma.detailUser.create({
            data: {
                phone: data.phone,
                address: data.address,
                city: data.city,
                postalCode: data.postalCode,
                bod: bod, // Kirimkan bod dalam bentuk Date
                user_id: data.user_id, // Pastikan user_id disertakan
            }
        });
    }

    static getDetailUserByUserId(user_id: number) {
        return prisma.detailUser.findUnique({
            where: { user_id }
        });
    }

    static updateDetailUser(user_id: number, data: Partial<RegisterRequest>) {
        return prisma.detailUser.update({
            where: { user_id },
            data
        });
    }

    static deleteDetailUser(user_id: number) {
        return prisma.detailUser.delete({
            where: { user_id }
        });
    }
}
