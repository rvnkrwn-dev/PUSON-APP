import {prisma} from "~/server/config/db";
import {RegisterRequest} from "~/types/AuthType";
import {getUserByEmailType, UpdateUserType} from "~/types/UserType";

export class User {
    static createUser = (data: any ) => {
        return prisma.user.create({
            data: {
                full_name: data.full_name,
                url_profile: data.url_profile,
                secure_url_profile: data.secure_url_profile,
                public_id_profile: data.public_id_profile,
                email: data.email,
                password: data.password,
                role: data?.role,
                status: data.status
            },
        });
    };

    static registerUser = (data: RegisterRequest) => {
        return prisma.user.create({
            data: {
                full_name: data.full_name,
                email: data.email,
                password: data.password
            },
        });
    };

    static updateUser = (id: number, data: UpdateUserType) => {
        return prisma.user.update({
            where: {
                id: id
            },
            data: data
        });
    };


    static getUserByEmail = (email: string) => {
        return prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                full_name: true,
                email: true,
                password: true,
                created_at: true,
                updated_at: true,
                role: true,
                url_profile: true,
                secure_url_profile: true,
                public_id_profile: true,
                status: true,
                detail_user: true,
            },
        }) as Promise<getUserByEmailType | null>;
    };

    static getUserById = (id: number) => {
        return prisma.user.findUnique({
            where: {id},
        });
    };

    static getAllUsers = async (page: number, pagesize: number) => {
        const skip = (page - 1) * pagesize; // Hitung data yang dilewatkan
        const take = pagesize; // Jumlah data per halaman

        return prisma.user.findMany({
            select: {
                id: true,
                full_name: true,
                email: true,
                password: false,
                role: true,
                status: true,
                url_profile: true,
                secure_url_profile: true,
                public_id_profile: true,
                created_at: true,
                updated_at: true,
                child: false,
                detail_user: false,
                logs: false,
                refresh_token: false,
                puskesmas: false,
                posyandu: false,
                staff_posyandu: false,
                med_check_up: false,
            },
            skip: skip, // Mulai dari data keberapa
            take: take, // Ambil berapa data
        });
    };


    static countAllUsers = () => {
        return prisma.user.count();
    };


    static deleteUser = (id: number) => {
        return prisma.user.delete({
            where: {id},
        });
    };

    static countUsers = () => {
        return prisma.user.count();
    };
}
