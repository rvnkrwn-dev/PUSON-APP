// MedCheckUp.ts
import { prisma } from "~/server/config/db";
import {MedCheckUpRequest} from "~/types/AuthType";
import {calculateAge} from "~/server/utils/calculatedAge";

export class MedCheckUp {
    static createMedCheckUp = async (data: MedCheckUpRequest) => {
        const child = await prisma.child.findUnique({ where: { id: data.child_id } });
        if (!child) throw new Error("Child not found");

        const age = calculateAge(child.bod);

        return prisma.medCheckUp.create({
            data: {
                child_id: data.child_id,
                height: data.height,
                weight: data.weight,
                age: age,
                circumference: data.circumference,
                user_id: data.user_id,
            },
            include: {
                child: true,
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        role: true,
                        status: true,
                    }
                }
            }
        });
    };

    static updateMedCheckUp = async (id: number, data: MedCheckUpRequest) => {
        const child = await prisma.child.findUnique({ where: { id: data.child_id } });
        if (!child) throw new Error("Child not found");

        const age = calculateAge(child.bod);

        return prisma.medCheckUp.update({
            where: { id },
            data: {
                child_id: data.child_id,
                height: data.height,
                weight: data.weight,
                age: age,
                circumference: data.circumference,
                user_id: data.user_id,
            },
            include: {
                child: true,
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        role: true,
                        status: true,
                    }
                }
            }
        });
    };

    static deleteMedCheckUp = (id: number) => {
        return prisma.medCheckUp.delete({
            where: { id },
            include: {
                child: true,
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        role: true,
                        status: true,
                    }
                }
            }
        });
    };

    static getMedCheckUpById = (id: number) => {
        return prisma.medCheckUp.findUnique({
            where: { id },
            include: {
                child: true,
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        role: true,
                        status: true,
                    }
                }
            }
        });
    };

    static getAllMedCheckUps = (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        return prisma.medCheckUp.findMany({
            skip: skip,
            take: take,
            include: {
                child: true,
                user: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        role: true,
                        status: true,
                    }
                }
            }
        });
    };

    static countAllMedCheckUp = () => {
        return prisma.medCheckUp.count();
    };

    static searchMedCheckUp = (search: string) => {
        return prisma.medCheckUp.findMany({
            where: {
                OR: [
                    {
                        child: {
                            name: {
                                contains: search,
                            }
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
