import { prisma } from '~/server/config/db';
import {KKRequest} from "~/types/AuthType";

export class KK {
    static createKK = (data: KKRequest) => {
        return prisma.kK.create({
            data: {
                number: data.number,
                user_id: data.user_id,
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

    static updateKK = (id: number, data: KKRequest) => {
        return prisma.kK.update({
            where: { id },
            data: {
                number: data.number,
                user_id: data.user_id,
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

    static deleteKK = (id: number) => {
        return prisma.kK.delete({
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
        })
    };

    static getKKById = async (id: number) => {
        return prisma.kK.findUnique({
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
        })
    };

    static getAllKKs = (page: number, pagesize: number) => {
        const skip = (page - 1) * pagesize;
        const take = pagesize;

        return  Promise.all([
            prisma.kK.count(), // Get total count of KKs
            prisma.kK.findMany({
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
        ]);
    };

    static countAllKK = () => {
        return prisma.kK.count();
    };

    static searchKK = (search: string) => {
        return prisma.kK.findMany({
            where: {
                OR: [
                    {
                        number: {
                            contains: search
                        }
                    },
                    {
                        user: {
                            email: {
                                contains: search
                            },
                            full_name: {
                                contains: search
                            }
                        }
                    }
                ]
            }
        })
    }
}
