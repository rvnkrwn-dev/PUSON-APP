import {prisma} from '~/server/config/db';
import {Gender} from '@prisma/client';
import items from "@redocly/ajv/lib/vocabularies/applicator/items";

export class Dashboard {
    static getStuntingDashboard = async (year: number) => {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year + 1, 0, 1);

        const results = await prisma.resultMedCheckUp.findMany({
            where: {
                created_at: {
                    gte: startDate,
                    lt: endDate
                }
            },
            include: {
                med_check_up: {
                    include: {
                        child: true,
                        _count: true
                    },
                },
            },
        });

        const stunting = {
            male: new Array(12).fill(0),
            female: new Array(12).fill(0),
        };

        results.forEach(result => {
            const month = new Date(result.created_at).getMonth();
            if (result.med_check_up.child.gender === Gender.male && result.status === 'stunting') {
                stunting.male[month]++;
            } else if (result.med_check_up.child.gender === Gender.female && result.status === 'stunting') {
                stunting.female[month]++;
            }
        });

        let totals = 0;
        stunting.male.forEach((item: number) => {
            totals += item;
        })

        stunting.female.forEach((item: number) => {
            totals += item;
        })

        return {
            stunting: [
                {
                    name: 'Laki - Laki',
                    data: stunting.male,
                },
                {
                    name: 'Perempuan',
                    data: stunting.female,
                }
            ],
            totals: totals,
            categories: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
        };
    };


    static getChildDashboard = async () => {
        const children = await prisma.child.findMany();

        const childCount = {
            male: 0,
            female: 0,
            totals: 0,
        };

        children.forEach(child => {
            childCount.totals++;
            if (child.gender === Gender.male) {
                childCount.male++;
            } else if (child.gender === Gender.female) {
                childCount.female++;
            }
        });

        return {
            anak: [childCount.male, childCount.female],
            label: ['Laki - Laki', 'Perempuan'],
            totals: childCount.totals,
        };
    };

}
