import {prisma} from "~/server/config/db";
import {RegisterRequest} from "~/types/AuthType";

export class User {
    static createUser = (data: RegisterRequest) => {
        return prisma.user.create({
            data: {
                full_name: data.full_name,
                url_profile: data.url_profile,
                secure_url_profile: data.secure_url_profile,
                public_id_profile: data.public_id_profile,
                email: data.email,
                password: data.password,
                role: data?.role
            },
        });
    };

    static updateUser = (id: number, data: RegisterRequest) => {
        return prisma.user.update({
            where: {id},
            data,
        });
    };

    static getUserByEmail = (email: string) => {
        return prisma.user.findUnique({
            where: {email},
        });
    };

    static getUserById = (id: number) => {
        return prisma.user.findUnique({
            where: {id},
        });
    };

    static getAllUsers = () => {
        return prisma.user.findMany();
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
