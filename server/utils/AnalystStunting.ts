import { StuntingStatus } from "~/types/TypesModel";
import { Gender } from "@prisma/client";

interface HeightWeightStandard {
    [age: number]: {
        male: number;
        female: number;
    };
}

const standarTinggiBadan: HeightWeightStandard = {
    0: { male: 49.4, female: 48.6 },
    1: { male: 76.1, female: 75.0 },
    2: { male: 85.5, female: 84.5 },
    3: { male: 94.1, female: 93.2 },
    4: { male: 102.4, female: 101.4 },
    5: { male: 109.6, female: 108.5 },
    6: { male: 116.3, female: 115.0 },
    7: { male: 122.0, female: 120.6 },
};

const standarBeratBadan: HeightWeightStandard = {
    0: { male: 3.3, female: 3.2 },
    1: { male: 10.2, female: 9.8 },
    2: { male: 12.1, female: 11.6 },
    3: { male: 14.0, female: 13.5 },
    4: { male: 15.6, female: 15.1 },
    5: { male: 17.1, female: 16.5 },
    6: { male: 18.5, female: 17.9 },
    7: { male: 19.9, female: 19.2 },
};

const standarLingkarKepala: HeightWeightStandard = {
    0: { male: 34.5, female: 33.9 },
    1: { male: 46.0, female: 45.4 },
    2: { male: 48.0, female: 47.2 },
    3: { male: 49.5, female: 48.6 },
    4: { male: 50.5, female: 49.5 },
    5: { male: 51.3, female: 50.3 },
    6: { male: 52.0, female: 50.8 },
    7: { male: 52.5, female: 51.2 },
};

export class AnalystStunting {
    static calculateIMT = (weight: number, height: number): number => {
        return weight / (height * height);
    };

    static calculateIPB = (weight: number, circumference: number): number => {
        return weight / circumference;
    };

    static determineStuntingStatus = (
        age: number,
        gender: Gender,
        weight: number,
        height: number,
        circumference: number
    ): StuntingStatus => {
        const imt = AnalystStunting.calculateIMT(weight, height);
        const ipb = AnalystStunting.calculateIPB(weight, circumference);
        const heightStandard = standarTinggiBadan[age][gender];
        const weightStandard = standarBeratBadan[age][gender];
        const circumferenceStandard = standarLingkarKepala[age][gender];

        if (height < heightStandard || imt < 18.5 || circumference < circumferenceStandard) {
            return StuntingStatus.stunting;
        } else if (imt >= 25 && imt < 30) {
            return StuntingStatus.overweight;
        } else if (imt >= 30) {
            return StuntingStatus.obese;
        } else {
            return StuntingStatus.normal;
        }
    };
}
