import {prisma} from '~/server/config/db';
import {StaffPuskesmasRequest} from "~/types/AuthType";

export class StaffPuskesmas {
    static createStaffPuskesmas = (data: StaffPuskesmasRequest) => {
        return prisma.staffPuskesmas.create({
            data: {
                name: data.name,
                user_id: data.user_id,
                puskesmas_id: data.puskesmas_id,
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

    static updateStaffPuskesmas = (id: number, data: StaffPuskesmasRequest) => {
        return prisma.staffPuskesmas.update({
            where: {id},
            data: {
                name: data.name,
                user_id: data.user_id,
                puskesmas_id: data.puskesmas_id,
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

    static deleteStaffPuskesmas = (id: number) => {
        return prisma.staffPuskesmas.delete({
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

    static getStaffPuskesmasById = (id: number) => {
        return prisma.staffPuskesmas.findUnique({
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

    static getAllStaffPuskesmas = (page: number, pagesize: number) => {
        const skip = (page - 1) * pagesize;
        const take = pagesize;
        return prisma.staffPuskesmas.findMany({
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

    static countAllStaffPuskesmas = () => {
        return prisma.staffPuskesmas.count();
    };
}
