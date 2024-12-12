import {prisma} from '~/server/config/db';
import {DetailUserRequest} from "~/types/AuthType";

export class DetailUser {
    static createDetailUser = (data: any) => {
        return prisma.detailUser.create({
            data: {
                phone: data.phone,
                address: data.address,
                city: data.city,
                postalCode: data.postalCode,
                bod: data.bod,
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

    static updateDetailUser = (id: number, data: DetailUserRequest) => {
        return prisma.detailUser.update({
            where: {id},
            data: {
                phone: data.phone,
                address: data.address,
                city: data.city,
                postalCode: data.postalCode,
                bod: data.bod,
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

    static deleteDetailUser = (id: number) => {
        return prisma.detailUser.delete({
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
                }
            }
        })
    };

    static getDetailUserById = (id: number) => {
        return prisma.detailUser.findUnique({
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
                }
            }
        })
    };

    static getAllDetailUsers = (page: number, pagesize: number) => {
        const skip = (page - 1) * pagesize; // Hitung data yang dilewatkan
        const take = pagesize; // Jumlah data per halaman

        return prisma.detailUser.findMany({
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
            },
            skip: skip, // Mulai dari data keberapa
            take: take, // Ambil berapa data
        })
    };

    static countAllDetailUser = () => {
        return prisma.detailUser.count();
    };

    static searchDetailUser = (search: string) => {
        return prisma.detailUser.findMany({
            where: {
                OR: [
                    {
                        phone: {
                            contains: search
                        },
                    }, {
                        address: {
                            contains: search
                        },
                    }, {
                        city: {
                            contains: search
                        },
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
