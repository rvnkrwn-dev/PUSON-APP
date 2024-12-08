import { prisma } from '~/server/config/db';
import { PuskesmasRequest } from '~/types/AuthType';
import { PuskesmasType } from '~/types/PuskesmasType';

export class Puskesmas {
    static createPuskesmas = (data: PuskesmasRequest): Promise<PuskesmasType> => {
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
        }) as unknown as Promise<PuskesmasType>;
    };

    static updatePuskesmas = (id: number, data: PuskesmasRequest): Promise<PuskesmasType> => {
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
        }) as unknown as Promise<PuskesmasType>;
    };

    static deletePuskesmas = (id: number): Promise<PuskesmasType> => {
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
        }) as unknown as Promise<PuskesmasType>;
    };

    static getPuskesmasById = (id: number): Promise<PuskesmasType | null> => {
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
        }) as unknown as Promise<PuskesmasType | null>;
    };

    static getAllPuskesmas = (page: number, pageSize: number): Promise<{ data: PuskesmasType[], total: number, page: number }> => {
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
        }).then(data => ({
            data: data as PuskesmasType[],
            total: data.length,
            page
        }));
    };

    static getPuskesmasByName = (name: string): Promise<PuskesmasType | null> => {
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
        }) as unknown as Promise<PuskesmasType | null>;
    };
}
