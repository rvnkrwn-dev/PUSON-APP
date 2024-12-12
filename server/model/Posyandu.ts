import {prisma} from '~/server/config/db';
import {PosyanduRequest} from "~/types/AuthType";


export class Posyandu {
    static createPosyandu = (data: PosyanduRequest) => {
        return prisma.posyandu.create({
            data: {
                name: data.name,
                address: data.address,
                phone: data.phone,
                user_id: data.user_id,
                puskesmas_id: data.puskesmas_id,
            },
            include: {
                created_by: {
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
                puskesmas: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phone: true
                    }
                }
            }
        })
    };

    static updatePosyandu = (id: number, data: PosyanduRequest) => {
        return prisma.posyandu.update({
            where: {id},
            data: {
                name: data.name,
                address: data.address,
                phone: data.phone,
                user_id: data.user_id,
                puskesmas_id: data.puskesmas_id,
            },
            include: {
                created_by: {
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
                puskesmas: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phone: true
                    }
                }
            }
        })
    };

    static deletePosyandu = (id: number) => {
        return prisma.posyandu.delete({
            where: {id},
            include: {
                created_by: {
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
                puskesmas: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phone: true,
                    }
                }
            }
        })
    };

    static getPosyanduById = (id: number) => {
        return prisma.posyandu.findUnique({
            where: {id},
            include: {
                created_by: {
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
                puskesmas: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phone: true
                    }
                }
            }
        })
    };

    static getAllPosyandu = (page: number, pagesize: number) => {
        const skip = (page - 1) * pagesize;
        const take = pagesize;
        return prisma.posyandu.findMany({
            skip: skip,
            take: take,
            include: {
                created_by: {
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
                puskesmas: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phone: true
                    }
                }
            }
        })
    };

    static countAllPosyandu = () => {
        return prisma.posyandu.count();
    };

    static searchPosyandu = (search: string) => {
        return prisma.posyandu.findMany({
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
