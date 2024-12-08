import { prisma } from '~/server/config/db';
import { DetailUserRequest } from '~/types/AuthType';
import { DetailUserType } from '~/types/TypesModel';

export class DetailUser {
    static createDetailUser = (data: DetailUserRequest): DetailUserType => {
        return  prisma.detailUser.create({
            data: {
                phone: data.phone,
                address: data.address,
                city: data.city,
                postalCode: data.postalCode,
                bod: data.bod,
                kk: data.kk,
                url_kk: data.url_kk,
                secure_url_kk: data.secure_url_kk,
                public_id_kk: data.public_id_kk,
                ktp: data.ktp,
                url_ktp: data.url_ktp,
                secure_url_ktp: data.secure_url_ktp,
                public_id_ktp: data.public_id_ktp,
                user_id: data.user_id
            },
            include: { user: true },
        }) as unknown as DetailUserType;
    };

    static updateDetailUser = (id: number, data: DetailUserRequest): DetailUserType => {
        return  prisma.detailUser.update({
            where: { id },
            data: {
                phone: data.phone,
                address: data.address,
                city: data.city,
                postalCode: data.postalCode,
                bod: data.bod,
                kk: data.kk,
                url_kk: data.url_kk,
                secure_url_kk: data.secure_url_kk,
                public_id_kk: data.public_id_kk,
                ktp: data.ktp,
                url_ktp: data.url_ktp,
                secure_url_ktp: data.secure_url_ktp,
                public_id_ktp: data.public_id_ktp,
                user_id: data.user_id
            },
            include: { user: true },
        }) as unknown as DetailUserType;
    };

    static deleteDetailUser = (id: number): DetailUserType => {
        return  prisma.detailUser.delete({
            where: { id },
            include: { user: true },
        }) as unknown as DetailUserType;
    };

    static getDetailUserById = (id: number): DetailUserType | null => {
        return prisma.detailUser.findUnique({
            where: { id },
            include: { user: true },
        }) as unknown as DetailUserType | null;
    };

    static getAllDetailUser = () => {
        return prisma.detailUser.findMany();
    }
}
