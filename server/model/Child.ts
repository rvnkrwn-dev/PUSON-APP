import {prisma} from "~/server/config/db";
import {ChildRequest} from "~/types/AuthType";

export class Child {
    static createChild = (data: any) => {
        return prisma.child.create({
            data: {
                name: data.name,
                bod: data.bod,
                gender: data.gender,
                status: data.status,
                user_id: data.userId,
                posyandu_id: data.posyanduId,
                nik: {
                    create: {
                        number: data.nik.number,
                        user_id: data.userId,
                        kk_id: data.nik.kk_id,
                    }
                }
            }
        });
    };

    static updateChild = (id: number, data: ChildRequest) => {
        return prisma.child.update({
            where: {id},
            data: {
                name: data.name,
                bod: data.bod,
                gender: data.gender,
                status: data.status,
                user_id: data.userId,
                posyandu_id: data.posyanduId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        password: false,
                        role: true,
                        status: true,
                        url_profile: false,
                        secure_url_profile: false,
                        public_id_profile: false,
                        created_at: false,
                        updated_at: false,
                        child: false,
                        detail_user: false,
                        logs: false,
                        refresh_token: false,
                        puskesmas: false,
                        posyandu: false,
                        staff_posyandu: false,
                        med_check_up: false,
                    }
                },
                posyandu: true,
                med_check_up: true,
                nik: true,
            }
        });
    };

    static deleteChild = (id: number) => {
        return prisma.child.delete({
            where: {id},
            include: {
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        password: false,
                        role: true,
                        status: true,
                        url_profile: false,
                        secure_url_profile: false,
                        public_id_profile: false,
                        created_at: false,
                        updated_at: false,
                        child: false,
                        detail_user: false,
                        logs: false,
                        refresh_token: false,
                        puskesmas: false,
                        posyandu: false,
                        staff_posyandu: false,
                        med_check_up: false,
                    }
                },
                posyandu: true,
                med_check_up: true,
                nik: true,
            }
        });
    };

    static getChildById = (id: number) => {
        return prisma.child.findUnique({
            where: {id},
            include: {
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        password: false,
                        role: true,
                        status: true,
                        url_profile: false,
                        secure_url_profile: false,
                        public_id_profile: false,
                        created_at: false,
                        updated_at: false,
                        child: false,
                        detail_user: false,
                        logs: false,
                        refresh_token: false,
                        puskesmas: false,
                        posyandu: false,
                        staff_posyandu: false,
                        med_check_up: false,
                    }
                },
                posyandu: true,
                med_check_up: true,
                nik: true,
            }
        });
    };

    static getAllChildren = (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.child.findMany({
            skip: skip,
            take: take,
            include: {
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        password: false,
                        role: true,
                        status: true,
                        url_profile: false,
                        secure_url_profile: false,
                        public_id_profile: false,
                        created_at: false,
                        updated_at: false,
                        child: false,
                        detail_user: false,
                        logs: false,
                        refresh_token: false,
                        puskesmas: false,
                        posyandu: false,
                        staff_posyandu: false,
                        med_check_up: false,
                    }
                },
                posyandu: true,
                med_check_up: true,
                nik: true,
            }
        });
    };

    static countAllChildren = () => {
        return prisma.child.count();
    };
}
