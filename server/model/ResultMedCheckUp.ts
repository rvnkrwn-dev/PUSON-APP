import {prisma} from "~/server/config/db";
import {ResultMedCheckUpRequest} from "~/types/AuthType";
import {AnalystStunting} from "~/server/utils/AnalystStunting";

export class ResultMedCheckUp {
    static createResultMedCheckUp = async (medCheckUpId: number) => {
        const medCheckUp = await prisma.medCheckUp.findUnique({
            where: {id: medCheckUpId},
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

        if (!medCheckUp) throw new Error("MedCheckUp not found");

        const age = this.calculateAge(medCheckUp.child.bod);
        const gender = medCheckUp.child.gender;

        const data: ResultMedCheckUpRequest = {
            imt: AnalystStunting.calculateIMT(medCheckUp.weight, medCheckUp.height),
            ipb: AnalystStunting.calculateIPB(medCheckUp.weight, medCheckUp.circumference),
            status: AnalystStunting.determineStuntingStatus(
                age,
                gender,
                medCheckUp.weight,
                medCheckUp.height,
                medCheckUp.circumference
            ),
            med_check_up_id: medCheckUp.id,
        };

        return prisma.resultMedCheckUp.create({
            data,
            include: {
                med_check_up: true,
            }
        });
    };

    static deleteResultMedCheckUp = async (id: number) => {
        return prisma.resultMedCheckUp.delete({
            where: {id},
            include: {
                med_check_up: true,
            }
        });
    };

    static getAllResultMedCheckUp = (page: number, pageSize: number) => {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        return prisma.resultMedCheckUp.findMany({
            skip: skip,
            take: take,
            include: {
                med_check_up: true,
            }
        });
    };

    static getResultMedCheckUpById = (id: number) => (
        prisma.resultMedCheckUp.findUnique({
            where: {id},
            include: {
                med_check_up: true,
            }
        })
    )

    static calculateAge = (birthdate: Date): number => {
        const now = new Date();
        const diff = now.getTime() - new Date(birthdate).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // Konversi ke tahun
    };

    static countAllResultMedCheckUp = () => {
        return prisma.resultMedCheckUp.count();
    };

    static searchResultMedCheckUp = (search: string) => {
        return prisma.resultMedCheckUp.findMany({
            where: {
                OR: [
                    {
                        med_check_up: {
                            child: {
                                name: {
                                    contains: search,
                                }
                            }
                        }
                    }
                ]
            }
        })
    }
}
