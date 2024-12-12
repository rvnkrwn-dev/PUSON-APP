import { prisma } from '~/server/config/db';
import { PuskesmasRequest } from '~/types/AuthType';

export class Puskesmas {
    static createPuskesmas = (data: PuskesmasRequest) => {
        return prisma.puskesmas.create({
            data: {
                name: data.name,
                address: data.address,
                phone: data.phone,
                user_id: data.user_id,
            },
            include: {
                created_by:{
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
                staff: true,
                posyandu: true
            }
        })
    };

    static updatePuskesmas = (id: number, data: PuskesmasRequest) => {
        return prisma.puskesmas.update({
            where: { id },
            data: {
                name: data.name,
                address: data.address,
                phone: data.phone,
                user_id: data.user_id,
            },
                include: {
                    created_by:{
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
                staff: true,
                posyandu: true
            }
        })
    };

    static deletePuskesmas = (id: number) => {
        return prisma.puskesmas.delete({
            where: { id },
            include: {
                created_by:{
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
                staff: true,
                posyandu: true
            }
        })
    };

    static getPuskesmasById = (id: number) => {
        return prisma.puskesmas.findUnique({
            where: { id },

            include: {
                created_by:{
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
                staff: true,
                posyandu: true
            }
        })
    };

    static getAllPuskesmas = (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.puskesmas.findMany({
            skip: skip,
            take: take,

            include: {
                created_by:{
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
                staff: true,
                posyandu: true
            }
        })
    };

    static getPuskesmasByName = (name: string) => {
        return prisma.puskesmas.findFirst({
            where: { name },

            include: {
                created_by:{
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
                staff: true,
                posyandu: true
            }
        })
    };

    static countAllPuskesmas = () => {
        return prisma.puskesmas.count();
    };

    static searchPuskesmas = (search: string) => {
        return prisma.puskesmas.findMany({
            where: {
                OR: [
                    { name: { contains: search } },
                    { address: { contains: search } },
                    { phone: { contains: search } },
                ]
            }
        })
    }
}
