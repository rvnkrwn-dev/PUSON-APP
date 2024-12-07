import {prisma} from "~/server/config/db";
import {CreateRequest, RegisterRequest} from "~/types/AuthType";
import {UserType} from "~/types/TypesModel";
import {Role} from "@prisma/client";

export class User {
    static createUser = (data: CreateRequest) => {
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

    static registerUser = (data: RegisterRequest) => {
        return prisma.user.create({
            data: {
                full_name: data.full_name,
                email: data.email,
                password: data.password
            },
        });
    };

    static updateUser = (id: number, data: Partial<UserType>) => {
        return prisma.user.update({
            where: {id},
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

    static getUserByEmail = (email: string) => {
        return prisma.user.findUnique({
            where: {email},
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
                detail_user: true
            }
        });
    };

    static getUserById = (id: number) => {
        return prisma.user.findUnique({
            where: {id},
        });
    };

    static getAllUsers = async ()=> {
        return prisma.user.findMany({
            select: {
                id: true,
                full_name: true,
                email: true,
                password: false,
                role: true,
                url_profile: true,
                secure_url_profile: true,
                public_id_profile: true,
                created_at: true,
                updated_at: true,
                child: true,
                detail_user: true,
                logs: false,
                refresh_token: false,
                puskesmas: false,
                posyandu: false,
                staff_posyandu: false,
                med_check_up: false,
            }
        });
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
