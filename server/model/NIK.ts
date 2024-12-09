import { prisma } from "~/server/config/db";
import { NIKType } from "~/types/NIKType";
import { NIKRequest } from "~/types/AuthType"

export class NIK {
    static createNIK = (data: NIKRequest) => {
        return prisma.nIK.create({
            data: {
                number: data.number,
                user_id: data.user_id,
                kk_id: data.kk_id
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
                }
            }
        }) as unknown as Promise<NIKType>;
    };

    static updateNIK = (id: number, data: NIKRequest) => {
        return prisma.nIK.update({
            where: { id },
            data: {
                number: data.number,
                user_id: data.user_id,
                kk_id: data.kk_id,
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
                }
            }
        })
    };

    static deleteNIK = (id: number) => {
        return prisma.nIK.delete({
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
                }
            }
        }) as unknown as Promise<NIKType>;
    };

    static getNIKById = (id: number) => {
        return prisma.nIK.findUnique({
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
                }
            }
        }) as unknown as Promise<NIKType | null>;
    };

    static getAllNIKs = (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return Promise.all([
            prisma.nIK.count(), // Get total count of NIKs
            prisma.nIK.findMany({
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
                    }
                }
            })
        ]).then(([total, niks]) => ({
            data: niks as NIKType[],
            total,
            page,
        }));
    };
}
