import { prisma } from "~/server/config/db";
import { NIKChildRequest } from "~/types/AuthType";

export class NIKChild {
    static createNIKChild = (data: NIKChildRequest) => {
        return prisma.nIKChild.create({
            data: {
                number: data.number,
                user_id: data.userId,
                kk_id: data.kkId,
                child_id: data.childId || null
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
                kk: true,
                Child: true,
            }
        });
    };

    static updateNIKChild = (id: number, data: NIKChildRequest) => {
        return prisma.nIKChild.update({
            where: { id },
            data: {
                number: data.number,
                user_id: data.userId,
                kk_id: data.kkId,
                child_id: data.childId || null,
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
                kk: true,
                Child: true,
            }
        });
    };

    static deleteNIKChild = (id: number) => {
        return prisma.nIKChild.delete({
            where: { id },
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
                kk: true,
                Child: true,
            }
        });
    };

    static getNIKChildById = (id: number) => {
        return prisma.nIKChild.findUnique({
            where: { id },
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
                kk: true,
                Child: true,
            }
        });
    };

    static getAllNIKChildren = (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.nIKChild.findMany({
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
                kk: true,
                Child: true,
            }
        });
    };

    static countAllNIKChildren = () => {
        return prisma.nIKChild.count();
    };
}
