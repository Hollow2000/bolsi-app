import { Frecuency } from "../enums/frecuency.enum";
import { MovementType } from "../enums/movement-type.enum";

export interface BillBase {
    id?: number;
    description: string;
    amountEstimated: number;
    frecuency: Frecuency;
    pocketId: number;
}

export interface BillUnique extends BillBase {
    frecuency: Frecuency.Unique;
    date: Date;
}

export interface BillDaily extends BillBase {
    frecuency: Frecuency.Daily;
    daysOfWeek: string[];
    repeats?: number;
}

export interface BillWeekly extends BillBase {
    frecuency: Frecuency.Weekly;
    dayOfWeek: string;
    repeats?: number;
}

export interface BillBiweekly extends BillBase {
    frecuency: Frecuency.Biweekly;
    dayOfMonthInital: number;
    repeats?: number;
}

export interface BillMonthly extends BillBase {
    frecuency: Frecuency.Monthly;
    dayOfMonth: number;
    repeats?: number;
}

export interface BillYearly extends BillBase {
    frecuency: Frecuency.Yearly;
    dayofMonth: number;
    month: string;
    repeats?: number;
}

export type Bill = BillUnique | BillDaily | BillWeekly | BillBiweekly | BillMonthly | BillYearly;

export interface MovementBase {
    id?: number;
    amount: number;
    date: Date;
    paymentMethodId: number;
    type: MovementType;
}

export interface SpenMovement extends MovementBase {
    type: MovementType.Spen;
    concept: string;
    pocketId: number;
}

export interface IncomeMovement extends MovementBase {
    type: MovementType.Income;
}

export type Movement = SpenMovement | IncomeMovement;

export interface TemplateMovement extends Omit<SpenMovement,'date'>{}