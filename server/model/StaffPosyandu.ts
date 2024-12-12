import { prisma } from '~/server/config/db';
import { StaffPosyanduRequest } from '~/types/AuthType';

export class StaffPosyandu {
    static createStaffPosyandu = (data: StaffPosyanduRequest) => {
        return prisma.staffPosyandu.create({
            data: {
                name: data.name,
                user_id: data.user_id,
                posyandu_id: data.posyandu_id,
            },
            include: {
                created_by: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
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
                posyandu: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phone: true,
                    }
                }
            }
        });
    };

    static updateStaffPosyandu = async (id: number, data: StaffPosyanduRequest) => {
        // Check if the record exists
        const existingRecord = await prisma.staffPosyandu.findUnique({ where: { id } });

        if (!existingRecord) {
            throw new Error('Record to update not found.');
        }

        return prisma.staffPosyandu.update({
            where: { id },
            data: {
                name: data.name,
                user_id: data.user_id,
                posyandu_id: data.posyandu_id,
            },
            include: {
                created_by: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
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
                posyandu: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phone: true,
                    }
                }
            }
        });
    };

    static deleteStaffPosyandu = (id: number) => {
        return prisma.staffPosyandu.delete({
            where: { id },
            include: {
                created_by: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
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
                posyandu: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phone: true,
                    }
                }
            }
        });
    };

    static getStaffPosyanduById = (id: number) => {
        return prisma.staffPosyandu.findUnique({
            where: { id },
            include: {
                created_by: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
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
                posyandu: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phone: true,
                    }
                }
            }
        });
    };

    static getAllStaffPosyandu = (page: number, pagesize: number) => {
        const skip = (page - 1) * pagesize;
        const take = pagesize;
        return prisma.staffPosyandu.findMany({
            skip: skip,
            take: take,
            include: {
                created_by: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
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
                posyandu: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        phone: true,
                    }
                }
            }
        });
    };

    static countAllStaffPosyandu = () => {
        return prisma.staffPosyandu.count();
    };

    static searchStaffPosyandu = (search: string) => {
        return prisma.staffPosyandu.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search
                        }
                    },
                    {
                        created_by: {
                            email : {
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
